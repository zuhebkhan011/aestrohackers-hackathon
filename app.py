from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
from datetime import datetime, timedelta
import random
from waitress import serve # Import waitress

app = Flask(__name__)
CORS(app)

# Load mock data
def load_data():
    data = {}
    try:
        with open('Transactions Data.json', 'r', encoding='utf-8') as f:
            data['transactions'] = json.load(f)
        with open('Credit Data.json', 'r', encoding='utf-8') as f:
            data['credit'] = json.load(f)
        # --- THIS LINE IS THE FIX ---
        # It now correctly loads your assets data.
        with open('Assets Data.json', 'r', encoding='utf-8') as f:
            data['assets'] = json.load(f)
        with open('EPF DATA.json', 'r', encoding='utf-8') as f:
            data['epf'] = json.load(f)
        with open('Investments data.json', 'r', encoding='utf-8') as f:
            data['investments'] = json.load(f)
        with open('liabilites.json', 'r', encoding='utf-8') as f:
            data['liabilities'] = json.load(f)
    except FileNotFoundError as e:
        print(f"Error: {e}. Please ensure all JSON files are in the same directory.")
        return None # Return None if a file is missing
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON format in file: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error while loading data: {e}")
        return None
    return data

DATA = load_data()

# --- INTENT RECOGNITION FUNCTION ---
def get_intent(query):
    query = query.lower().strip()
    greeting_keywords = ['hello', 'hi', 'hey', 'greetings', 'sup']
    thanks_keywords = ['thanks', 'thank you', 'appreciate it']

    if any(keyword in query.split() for keyword in greeting_keywords):
        return 'greeting'
    if any(keyword in query.split() for keyword in thanks_keywords):
        return 'thanks'
    if len(query) > 0:
        return 'financial_query'
    return 'unknown'

# --- MAIN INSIGHTS LOGIC ---
def get_insights(query, permissions):
    
    # Check if data loaded successfully
    if DATA is None:
        return "There was a problem loading the financial data files. Please check the server logs."

    intent = get_intent(query)
    
    if intent == 'greeting':
        return random.choice([
            "Hello! How can I help with your finances today?", 
            "Hi there! What financial questions do you have?", 
            "Hey! Ready to look at your finances?"
        ])

    if intent == 'thanks':
        return random.choice(["You're welcome!", "No problem!", "Happy to help!"])

    if intent == 'financial_query':
        query = query.lower()
        
        # --- Spending Queries ---
        if any(word in query for word in ['spend', 'spent', 'spending', 'much']):
            if not permissions.get('transactions'):
                return "You have revoked access to Transactions data. Please enable permissions to proceed."
            
            last_month = datetime.now().month - 1 or 12
            last_month_name = datetime.strptime(str(last_month), '%m').strftime('%B').lower()

            if last_month_name not in DATA.get('transactions', {}):
                 return f"I'm sorry, I don't have transaction data for {last_month_name.capitalize()}."
            
            total_spent = sum(t['amount'] for t in DATA['transactions'][last_month_name] if t['type'] == 'debit')
            return f"You spent a total of ${total_spent:.2f} last month."

        # --- Savings Forecast Query ---
        if 'savings' in query and 'forecast' in query:
            if not permissions.get('transactions') or not permissions.get('assets'):
                return "To forecast savings, I need access to both your Assets and Transactions data. Please enable permissions to proceed."

            avg_monthly_income = sum(t['amount'] for t in DATA['transactions']['january'] if t['type'] == 'credit')
            avg_monthly_expense = sum(t['amount'] for t in DATA['transactions']['january'] if t['type'] == 'debit')
            avg_monthly_savings = avg_monthly_income - avg_monthly_expense
            
            current_savings = DATA.get('assets', {}).get('bank_balance', 0) + DATA.get('assets', {}).get('cash', 0)
            forecasted_savings = []
            for i in range(1, 7):
                current_savings += avg_monthly_savings
                forecasted_savings.append({"month": f"Month {i}", "savings": round(current_savings, 2)})
                
            return "Based on your current trends, here is a forecast of your savings for the next 6 months...\n" + json.dumps(forecasted_savings)

        # ... (other financial query handlers would go here) ...
    
    return "I'm sorry, I couldn't understand that query. Please try asking a different question."

@app.route('/query', methods=['POST'])
def process_user_query():
    try:
        data = request.json
        query = data.get('query', '')
        permissions = data.get('permissions', {})
        response = get_insights(query, permissions)
        return jsonify({"response": response})
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"response": "Sorry, something went wrong on our end. Please try again."}), 500

if __name__ == '__main__':
    if DATA is not None:
        print("Starting production server with Waitress...")
        serve(app, host='0.0.0.0', port=5000)
    else:
        print("Could not start server because data loading failed. Please check the JSON files.")

