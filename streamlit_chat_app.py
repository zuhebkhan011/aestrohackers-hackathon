import streamlit as st
import random
import time
from finance_engine import analyze_and_respond

# Set up the Streamlit page configuration.
st.set_page_config(page_title="Streamlit AI Chat", layout="centered")

# Main page title.
st.markdown("<h1 style='text-align: center; color: #1f2937;'>AI Human-like Chat</h1>", unsafe_allow_html=True)

# Initialize chat history in Streamlit's session state.
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat messages from history on app rerun.
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Function to get an AI response.
def get_ai_response(user_message):
    # This is the core connection point to your professional AI.
    # We pass the full chat history to the AI for better context.
    return analyze_and_respond(user_message, st.session_state.messages)

# Accept user input.
if prompt := st.chat_input("Type your message..."):
    # Add user message to chat history.
    st.session_state.messages.append({"role": "user", "content": prompt})
    # Display user message in chat message container.
    with st.chat_message("user"):
        st.markdown(prompt)

    # Get AI response and display it.
    with st.chat_message("assistant"):
        with st.spinner("Thinking..."):
            # Use the new, professional AI function.
            ai_response = get_ai_response(prompt)
            st.markdown(ai_response)
    
    # Add AI response to chat history.
    st.session_state.messages.append({"role": "assistant", "content": ai_response})
