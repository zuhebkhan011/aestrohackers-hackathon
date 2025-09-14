import datetime
import random
import time

# Sample datasets for demonstration
salary_history = [
    {"month": "Jan 2025", "amount": 50000},
    {"month": "Feb 2025", "amount": 50000},
    {"month": "Mar 2025", "amount": 52000},
]

expenses = [
    {"date": "2025-09-03", "category": "grocery", "amount": 2100},
    {"date": "2025-09-05", "category": "travel", "amount": 8000},
    {"date": "2025-09-06", "category": "grocery", "amount": 1100}
]

budget = {"travel": 10000}  # Budget limits by category
savings_this_year = 120000

bills = [
    {"name": "Internet", "due_date": "2025-09-17"},
    {"name": "Credit Card", "due_date": "2025-09-15"},
]

goals = {"Emergency_fund": {"target": 50000, "current": 35000}}

transactions = [
    {"item": "Phone", "amount": 18000, "date": "2025-09-09"},
    {"item": "Groceries", "amount": 2100, "date": "2025-09-03"},
    {"item": "Shoes", "amount": 7000, "date": "2025-08-21"},
]

assets = 350000
liabilities = 120000

def show_salary_history():
    return f"My salary history is: {salary_history[0]['amount']}, {salary_history[1]['amount']}, {salary_history[2]['amount']}"

def analyze_grocery_spending():
    total = sum(x["amount"] for x in expenses if x["category"] == "grocery")
    return f"Total grocery spending this month: ₹{total}"

def travel_budget_status():
    travel = sum(x["amount"] for x in expenses if x["category"] == "travel")
    if travel < budget["travel"]:
        return f"Travel spending ₹{travel} is within the budget of ₹{budget['travel']}."
    else:
        return f"Travel spending ₹{travel} exceeds the budget!"

def saved_this_year():
    return f"You have saved ₹{savings_this_year} this year."

def bills_due_next_week():
    today = datetime.date.today()
    next_week = today + datetime.timedelta(days=7)
    due_bills = [b for b in bills if datetime.datetime.strptime(b["due_date"], "%Y-%m-%d").date() < next_week]
    if not due_bills:
        return "No bills due next week."
    return f"Bills due next week: {', '.join([b['name'] for b in due_bills])}"

def emergency_fund_progress():
    percent = (goals["Emergency_fund"]["current"] / goals["Emergency_fund"]["target"]) * 100
    return f"Emergency fund progress: {percent:.0f}% completed"

def top5_last_purchases():
    # Sort transactions by date (most recent first)
    sorted_transactions = sorted(transactions, key=lambda x: x["date"], reverse=True)
    top_5 = sorted_transactions[:5]
    return f"Your last purchases are: {[x['item'] for x in top_5]}"

def net_worth_today():
    return f"Your net worth today: ₹{assets - liabilities}"

def money_saving_suggestions():
    return "Consider a budget plan, reduce eating out, and invest in high-yield savings accounts."
    
def loan_info():
    return "Loans are a sum of money borrowed from a financial institution. You have to repay the borrowed amount with interest over a set period of time."
    
def personal_finance_info():
    return "Personal finance is the management of your money and financial decisions, including budgeting, saving, and investing."
    
def credit_score_info():
    return "A credit score is a number that represents your creditworthiness, which lenders use to evaluate the risk of lending money to you. A higher score is better."

def hi():
    return "Hi, How can I help you with your Finance?"
    
def hii():
    return "Hii, How can I help you with your Finance?"
    
def hello():
    return "Hello, How can I help you with your Finance?"
    
def hellow():
    return "Hellow, How can I help you with your Finance?"

def hey():
    return "Hey, How can I help you with your Finance?"

def heyy():
    return "Heyy, How can I help you with your Finance?"

def heyyy():
    return "Heyyy, How can I help you with your Finance?"
    
def namaste():
    return "Namaste, How can I help you with your Finance?"
    
def hy():
    return "Hy, How can I help you with your Finance?"

def hyy():
    return "Hyy, How can I help you with your Finance?"

def hyyy():
    return "Hyyy, How can I help you with your Finance?"

def thanks():
    return "Welcome, let me know if you want any other help"

def ok_thanks():
    return "Welcome, let me know if you want any other help"

def bye():
    return "Bye, If you have any more questions or need help for anything else, feel free to ask"

def last_month_expenses():
    # This is a placeholder since the data is not available.
    return "Last month's expenses were around ₹17000.00."

# This is the main function that your Streamlit app will call.
def analyze_and_respond(user_query, chat_history):
    query = user_query.lower()
    
    # Use a simple dispatcher to route the query to the correct function.
    if "salary history" in query:
        return show_salary_history()
    elif "grocery spending" in query:
        return analyze_grocery_spending()
    elif "travel budget" in query:
        return travel_budget_status()
    elif "saved this year" in query:
        return saved_this_year()
    elif "bills due" in query:
        return bills_due_next_week()
    elif "emergency fund" in query:
        return emergency_fund_progress()
    elif "last purchases" in query:
        return top5_last_purchases()
    elif "net worth" in query:
        return net_worth_today()
    elif "saving suggestions" in query:
        return money_saving_suggestions()
    elif "loan" in query:
        return loan_info()
    elif "personal finance" in query:
        return personal_finance_info()
    elif "credit score" in query:
        return credit_score_info()
    elif "hi" in query:
        return hi()
    elif "hii" in query:
        return hii()
    elif "hello" in query:
        return hello()
    elif "hellow" in query:
        return hellow()
    elif "hey" in query:
        return hey()
    elif "heyy" in query:
        return heyy()
    elif "heyyy" in query:
        return heyyy()
    elif "namaste" in query:
        return namaste()
    elif "hy" in query:
        return hy()
    elif "hyy" in query:
        return hyy()
    elif "hyyy" in query:
        return hyyy()
    elif "thanks" in query:
        return thanks()
    elif "ok thanks" in query:
        return ok_thanks()
    elif "bye" in query:
        return bye()
    elif "last month" in query:
        return last_month_expenses()
    else:
        return "I'm sorry, I cannot answer that yet. Please ask one of the predefined questions."
