from cs50 import SQL
from datetime import datetime

from src.modell import Expense, Session, Subscription, User

class DatabaseManager():
    database = SQL("sqlite:///database.db")

    def get_user(self, email) -> User:
        user = self.database.execute(
            "SELECT * FROM users WHERE email = ?", email)
        if len(user) == 0:
            return None
        return user[0]

    def get_used_emails(self):
        return self.database.execute("SELECT email FROM users")

    def insert_user(self, email, hash):
        return self.database.execute("INSERT INTO users (email, hash) VALUES (?, ?)", email, hash)

    def get_session(self, token) -> Session:
        session = self.database.execute(
            "SELECT * FROM sessions WHERE token = ?", token)
        if len(session) == 0:
            return None
        return session[0]

    def insert_session(self, token, expires, user_id):
        return self.database.execute("INSERT INTO sessions (token, expires, user_id) VALUES (?, ?, ?)", token, expires, user_id)

    def update_session(self, token, expires):
        return self.database.execute("UPDATE sessions SET expires = ? WHERE token = ?", expires, token)

    def insert_expense(self, expense: Expense):
        return self.database.execute(
            "INSERT INTO expenses (title, category, amount, payment_date, user_id) VALUES (?, ?, ?, ?, ?)", 
            expense.title, expense.category, expense.amount, expense.date, expense.user)
    
    def get_expenses(self, user_id):
        return self.database.execute("SELECT title, category, amount, payment_date, user_id FROM expenses WHERE user_id = ?", user_id)
    
    def insert_subscription(self, subscription: Subscription):
        return self.database.execute("INSERT INTO subscriptions (title, category, amount, start, user_id, period, temporal, next ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
                                     subscription.title, subscription.category, subscription.amount, subscription.date,
                                     subscription.user, subscription.period, subscription.temporal, subscription.next)

    def get_subscriptions(self, user_id):
        return self.database.execute("SELECT * FROM subscriptions WHERE user_id = ?", user_id)