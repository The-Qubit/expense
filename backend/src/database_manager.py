from cs50 import SQL
from datetime import datetime

from src.modell import Transaction, Session, Subscription, User

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

    def insert_expense(self, expense: Transaction):
        return self.database.execute(
            "INSERT INTO transactions (title, category, amount, date, type, user_id) VALUES (?, ?, ?, ?, ?, ?)", 
            expense.title, expense.category, expense.amount, expense.date, expense.type,expense.user)
    
    def get_expenses(self, user_id):
        return self.database.execute("SELECT title, category, amount, date, type, user_id FROM transactions WHERE user_id = ?", user_id)
    
    def insert_subscription(self, subscription: Subscription):
        return self.database.execute("INSERT INTO subscriptions (title, category, amount, start, user_id, period, temporal, next ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
                                     subscription.title, subscription.category, subscription.amount, subscription.date,
                                     subscription.user, subscription.period, subscription.temporal, subscription.next)

    def update_next_subscription(self, id, next):
        return self.database.execute("UPDATE subscriptions SET next = ? WHERE id = ?", next, id)

    def get_user_subscriptions(self, user_id):
        return self.database.execute("SELECT * FROM subscriptions WHERE user_id = ?", user_id)
    
    def get_all_subscriptions(self):
        return self.database.execute("SELECT * FROM subscriptions")