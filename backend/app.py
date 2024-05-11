import threading
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

from werkzeug.security import check_password_hash, generate_password_hash
from src.subscription_processor import calculate_next, debit_subscriptions, transactionFromSubscription
from src.modell import Transaction, Subscription

from src.session_manager import SessionManager
from src.database_manager import DatabaseManager

app = Flask(__name__)
CORS(app)

database_manager = DatabaseManager()
session_manager = SessionManager()


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
            return jsonify({'token': token, 'id': account["id"], "currency": account["currency"]}), 200

    return jsonify({"error": "Invalid email or password"}), 401


@app.route("/currency", methods = ['POST'])
def currency():
        data = request.get_json()
        currency: str = data.get("currency")
        user: str = data.get("user")
        
        print(user)
        print(currency)

        database_manager.update_currency(user, currency)

        return jsonify({"message": "Currency updated successfully"}), 201

@app.route("/expense", methods=["POST"])
def expense():
    data = request.get_json()

    session = data.get("session_id", None)
    if not session_manager.is_valid(session):
        return jsonify({"message":"Invalid session. Please login!"}), 401

    data.pop("session_id", None)
    
    expense = Transaction(**data, id=None)
    print(expense)
    database_manager.insert_transaction(expense)
    return jsonify({"message": "Expense added successfully"}), 201


@app.route("/subscription", methods =["POST"])
def subscription():
    data = request.get_json()
    
    session = data.get("session_id", None)
    if not session_manager.is_valid(session):
        return jsonify({"message":"Invalid session. Please login!"}), 401

    data.pop("session_id", None)

    subscription = Subscription(**data, next=data.get("date"), id=None)

    if subscription.next == datetime.now().strftime("%Y-%m-%d"):
        database_manager.insert_transaction(subscription)
        subscription.next = calculate_next(subscription.date, subscription.period, subscription.temporal)

    database_manager.insert_subscription(subscription)
    return jsonify({"message": "Subscription added successfully"}), 200


@app.route("/expenses", methods=["GET"])
def expenses():
    user = request.args.get("user")

    session = request.args.get("session_id", None)
    if not session_manager.is_valid(session):
        return jsonify({"message":"Invalid session. Please login!"}), 401
    expenses = database_manager.get_expenses(user)

    return jsonify(expenses)


@app.route("/subscriptions", methods=["GET"])
def subscriptions():
    user = request.args.get("user")

    session = request.args.get("session_id", None)
    if not session_manager.is_valid(session):
        return jsonify({"message":"Invalid session. Please login!"}), 401

    subscriptions = database_manager.get_user_subscriptions(user)

    return jsonify(subscriptions)


@app.route("/update_subscription", methods=["POST"])
def update_subscription():
    data = request.get_json()
    
    session = data.get("session_id", None)
    if not session_manager.is_valid(session):
        return jsonify({"message":"Invalid session. Please login!"}), 401

    data.pop("session_id", None)

    subscription = Subscription(**data, next=data.get("date"))

    subscription.user = database_manager.get_user_information(session)["user_id"]
    database_manager.update_subscription(subscription)
    return jsonify({"message": "Subscription updated successfully"}), 201


@app.route("/delete_subscription", methods=["POST"])
def delete_subscription():
    data = request.get_json()

    session = data.get("session_id", None)
    if not session_manager.is_valid(session):
        return jsonify({"message":"Invalid session. Please login!"}), 401

    id = request.args.get("id")

    database_manager.delete_subscription(id)
    return jsonify({"message": "Subscription deleted successfully"}), 201



@app.route("/getUserInformation", methods=["GET"])
def get_user_information():
    token = request.args.get("token")
    user_information = database_manager.get_user_information(token)

    print(user_information)
    return jsonify(user_information), 200

if __name__ == "__main__":
    x = threading.Thread(target=debit_subscriptions, daemon=True)
    x.start()
    app.run(debug=True)
