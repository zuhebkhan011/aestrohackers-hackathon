import streamlit as st
import requests
import json
import pandas as pd

# Flask server URL
BACKEND_URL = "http://localhost:5000/query"

# Page config
st.set_page_config(
    page_title="AI Personal Finance Assistant",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- UI Setup ---
st.title("💰 AI Personal Finance Assistant")
st.markdown("Ask me anything about your finances or get AI-powered insights.")

# Sidebar for permissions
st.sidebar.title("Data Permissions")
st.sidebar.markdown("Toggle which data you want to grant me access to.")

if 'permissions' not in st.session_state:
    st.session_state.permissions = {
        "assets": True,
        "liabilities": True,
        "transactions": True,
        "epf": True,
        "credit": True,
        "investments": True
    }

for key in st.session_state.permissions.keys():
    st.session_state.permissions[key] = st.sidebar.checkbox(f"Access to {key.capitalize()}", value=st.session_state.permissions[key])

# --- Chat Interface and Demo Flow ---
st.subheader("Chat Interface")
if "messages" not in st.session_state:
    st.session_state.messages = []

# Initial demo messages
if not st.session_state.messages:
    st.session_state.messages.append({"role": "assistant", "content": "Hello! I am your personal finance assistant. Ask me anything about your finances."})
    st.session_state.messages.append({"role": "user", "content": "How much did I spend last month?"})
    
    # Simulate a response from the backend for the demo
    response = requests.post(BACKEND_URL, json={
        "query": "How much did I spend last month?",
        "permissions": {"assets": True, "liabilities": True, "transactions": True, "epf": True, "credit": True, "investments": True}
    })
    st.session_state.messages.append({"role": "assistant", "content": response.json()['response']})

    st.session_state.messages.append({"role": "assistant", "content": "For this demo, I will now revoke my access to your EPF and Credit data to show how permissions work."})
    st.session_state.permissions['epf'] = False
    st.session_state.permissions['credit'] = False
    st.session_state.messages.append({"role": "user", "content": "What is my EPF balance?"})

    response = requests.post(BACKEND_URL, json={
        "query": "What is my EPF balance?",
        "permissions": st.session_state.permissions
    })
    st.session_state.messages.append({"role": "assistant", "content": response.json()['response']})

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.write(message["content"])
        
if prompt := st.chat_input("Ask a question..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.write(prompt)
    
    with st.spinner("Thinking..."):
        try:
            response = requests.post(BACKEND_URL, json={
                "query": prompt,
                "permissions": st.session_state.permissions
            })
            
            assistant_response = response.json()['response']
            
            st.session_state.messages.append({"role": "assistant", "content": assistant_response})
            with st.chat_message("assistant"):
                st.write(assistant_response)
        
        except requests.exceptions.ConnectionError:
            st.error("Connection Error: Is the Flask backend running?")

# --- Dashboard with Charts ---
st.subheader("Financial Dashboard")

tab1, tab2 = st.tabs(["Spending", "Savings Forecast"])

with tab1:
    st.markdown("#### Quarterly Spending Breakdown")
    try:
        q1_transactions = requests.post(BACKEND_URL, json={
            "query": "all transactions",
            "permissions": st.session_state.permissions
        }).json()['response']

        if q1_transactions and q1_transactions != "You have revoked access to Transactions data. Please enable permissions to proceed.":
            # Assuming a simplified hardcoded structure for the prototype
            spending_data = {
                "Food": 245.8,
                "Bills": 448.5,
                "Shopping": 444.15,
                "Travel": 555.0
            }
            st.bar_chart(pd.DataFrame(spending_data, index=["Amount"]).T)
        else:
            st.warning("Please enable Transactions data to view spending charts.")
    except Exception:
        st.warning("Could not load spending data. Please ensure the backend is running and permissions are enabled.")

with tab2:
    st.markdown("#### 6-Month Savings Forecast")
    try:
        forecast_response = requests.post(BACKEND_URL, json={
            "query": "forecast savings",
            "permissions": st.session_state.permissions
        }).json()['response']
        
        if "forecast" in forecast_response:
            forecast_data = json.loads(forecast_response.split('\n')[1])
            df = pd.DataFrame(forecast_data).set_index("month")
            st.line_chart(df)
            st.write(forecast_response.split('\n')[0])
        else:
            st.warning(forecast_response)
    except Exception:
        st.warning("Could not load savings forecast. Please ensure the backend is running and permissions are enabled.")