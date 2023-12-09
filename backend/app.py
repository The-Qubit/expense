import threading
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

from werkzeug.security import check_password_hash, generate_password_hash
from src.subscription_processor import debit_subscriptions
from src.modell import Transaction, Subscription

from src.session_manager import SessionManager
from src.database_manager import DatabaseManager

app = Flask(__name__)
CORS(app)

database_manager = DatabaseManager()
session_manager = SessionManager()

@app.route("/hello")
def get():
    return {"message": "Hello, welcome to the API!"}


@app.route("/isEmailUsed")
def isEmailUsed():
    email = request.args.get("email")
    emails = database_manager.get_used_emails()
    for entry in emails:
        if entry['email'] == email:
            return jsonify({'is_used': True}), 200
    return jsonify({'is_used': False}), 200


@app.route("/signup", methods = ['POST'])
def signup():
    data = request.get_json()
    email: str = data.get("email")
    password: str = data.get("password")
    if email != None and password != None:
        database_manager.insert_user(email.lower(), generate_password_hash(password))
        return jsonify(data), 201
    else:
        return jsonify({"error": "Invalid email or password"}), 401


@app.route("/login", methods = ['POST'])
def login():
    data = request.get_json()

    email: str = data.get("email")
    password: str = data.get("password")

    if email != None and password != None:
        account = database_manager.get_user(email.lower())
        if account != None and check_password_hash(account["hash"], password):
            token = session_manager.new_session(account["id"])
            return jsonify({'token': token, 'id': account["id"]}), 200

    return jsonify({"error": "Invalid email or password"}), 401

@app.route("/expense", methods=["POST"])
def expense():
    data = request.get_json()

    session = data.get("session_id", None)
    print(session)

    data.pop("session_id", None)
    
    expense = Transaction(**data)
    database_manager.insert_expense(expense)
    return jsonify({"message": "Expense added successfully"}), 201


@app.route("/subscription", methods =["POST"])
def subscription():
    data = request.get_json()
    
    session = data.get("session_id", None)
    print(session)

    data.pop("session_id", None)

    subscription = Subscription(**data, next=data.get("date"))

    if subscription.next == datetime.now().strftime("%Y-%m-%d"):
        print(True)
        # TODO: Add Expense and set next subscription date

    database_manager.insert_subscription(subscription)
    return jsonify({"message": "Subscription added successfully"}), 200


@app.route("/expenses", methods=["GET"])
def expenses():
    user = request.args.get("user")

    expenses = database_manager.get_expenses(user)
    print(expenses)

    return jsonify(expenses)


if __name__ == "__main__":
    x = threading.Thread(target=debit_subscriptions, daemon=True)
    x.start()
    app.run(debug=True)
