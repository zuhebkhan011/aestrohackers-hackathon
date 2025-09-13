from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
from datetime import datetime, timedelta
import random
from waitress import serve
from fuzzywuzzy import fuzz # A great library for fuzzy string matching

# Load mock data (your existing function, no change needed here)
def load_data():
    data = {}
    try:
        with open('Transactions Data.json', 'r', encoding='utf-8') as f:
            data['transactions'] = json.load(f)
        with open('Credit Data.json', 'r', encoding='utf-8') as f:
            data['credit'] = json.load(f)
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
        return None
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON format in file: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error while loading data: {e}")
        return None
    return data

DATA = load_data()
app = Flask(__name__)
CORS(app)

# ----------------------------------------------------
# 🌟 Step 1: Define Your Financial "Tools" or Functions 🌟
# ----------------------------------------------------
# These functions will contain the core business logic.
# The AI's job is to figure out which one to call.

def get_total_spending(permissions):
    """Calculates total debit transactions from the last month."""
    if not permissions.get('transactions'):
        return "You have revoked access to Transactions data. Please enable permissions to proceed."

    # This is a good place to make the logic more robust.
    # The provided data is for specific months, so let's check for 'august'
    # as a stand-in for "last month" since it's the last month available.
    if 'august' not in DATA.get('transactions', {}):
        return "I'm sorry, I don't have transaction data for the last month."
    
    total_spent = sum(t['amount'] for t in DATA['transactions']['august'] if t['type'] == 'debit')
    return f"You spent a total of ${total_spent:.2f} in August."

def forecast_savings(permissions):
    """Forecasts savings based on average income and expenses."""
    if not permissions.get('transactions') or not permissions.get('assets'):
        return "To forecast savings, I need access to both your Assets and Transactions data. Please enable permissions to proceed."

    # Calculate average monthly savings from available data
    total_income = sum(t['amount'] for t in DATA['transactions']['january'] if t['type'] == 'credit')
    total_expense = sum(t['amount'] for t in DATA['transactions']['january'] if t['type'] == 'debit')
    avg_monthly_savings = total_income - total_expense
    
    current_savings = DATA.get('assets', {}).get('bank_balance', 0) + DATA.get('assets', {}).get('cash', 0)
    forecasted_savings = []
    for i in range(1, 7):
        current_savings += avg_monthly_savings
        forecasted_savings.append({"month": f"Month {i}", "savings": round(current_savings, 2)})
        
    return "Based on your current trends, here is a forecast of your savings for the next 6 months...\n" + json.dumps(forecasted_savings)

def calculate_net_worth(permissions):
    """Calculates net worth by summing assets and subtracting liabilities."""
    if not permissions.get('assets') or not permissions.get('liabilities') or not permissions.get('investments'):
        return "To calculate your net worth, I need access to your Assets, Investments, and Liabilities data."

    # Sum all assets
    total_assets = DATA['assets'].get('bank_balance', 0) + DATA['assets'].get('cash', 0)
    total_assets += sum(inv['total_value'] for inv in DATA['investments'].values())
    total_assets += DATA['epf'].get('balance', 0) # Include EPF balance in assets

    # Sum all liabilities
    total_liabilities = sum(loan['outstanding_balance'] for loan in DATA['liabilities'].values())

    net_worth = total_assets - total_liabilities
    return f"Your estimated net worth is ${net_worth:.2f}."

def get_credit_score(permissions):
    """Retrieves credit score and rating."""
    if not permissions.get('credit'):
        return "You have revoked access to Credit data. Please enable permissions to proceed."

    score = DATA['credit']['score']
    rating = DATA['credit']['rating']
    return f"Your current credit score is {score}, which is an {rating} rating."

# ----------------------------------------------------
# 🧠 Step 2: Create a Smarter Intent Recognition System 🧠
# ----------------------------------------------------
# This system maps user queries to the right function.
# You can use simple keywords and fuzzy matching for a start.

INTENT_MAP = {
    'get_total_spending': ['spending', 'spent', 'debits', 'money out'],
    'forecast_savings': ['savings forecast', 'future savings', 'how much can i save'],
    'calculate_net_worth': ['net worth', 'how much i am worth', 'total assets and liabilities', 'financial position'],
    'get_credit_score': ['credit score', 'credit rating', 'check my credit']
}

def get_intent(query):
    query_lower = query.lower()
    
    # Check for exact matches first
    greeting_keywords = ['hello', 'hi', 'hey', 'greetings']
    if any(word in query_lower.split() for word in greeting_keywords):
        return 'greeting'
    
    thanks_keywords = ['thanks', 'thank you', 'appreciate it']
    if any(word in query_lower.split() for word in thanks_keywords):
        return 'thanks'

    # Use fuzzy matching to find the best intent match
    best_match_score = 0
    best_match_intent = 'unknown'

    for intent, keywords in INTENT_MAP.items():
        for keyword in keywords:
            # Use a threshold to avoid false positives
            match_score = fuzz.token_sort_ratio(query_lower, keyword)
            if match_score > best_match_score and match_score > 60: # Threshold of 60
                best_match_score = match_score
                best_match_intent = intent
    
    return best_match_intent

# ----------------------------------------------------
# 🚀 Step 3: Revise the Main Insight Logic 🚀
# ----------------------------------------------------
# The main function now calls the correct "tool" based on the detected intent.
def get_insights(query, permissions):
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
    
    if intent == 'get_total_spending':
        return get_total_spending(permissions)

    if intent == 'forecast_savings':
        return forecast_savings(permissions)
        
    if intent == 'calculate_net_worth':
        return calculate_net_worth(permissions)

    if intent == 'get_credit_score':
        return get_credit_score(permissions)

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