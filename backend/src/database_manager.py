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
        self.database.execute(
            "INSERT INTO users (email, hash) VALUES (?, ?)", email, hash)

    def get_session(self, token) -> Session:
        session = self.database.execute(
            "SELECT * FROM sessions WHERE token = ?", token)
        if len(session) == 0:
            return None
        return session[0]

    def insert_session(self, token, expires, user_id):
        self.database.execute(
            "INSERT INTO sessions (token, expires, user_id) VALUES (?, ?, ?)", token, expires, user_id)

    def update_session(self, token, expires):
        self.database.execute(
            "UPDATE sessions SET expires = ? WHERE token = ?", expires, token)

    def insert_transaction(self, expense: Transaction):
        self.database.execute(
            "INSERT INTO transactions (title, category, amount, date, type, user_id) VALUES (?, ?, ?, ?, ?, ?)",
            expense.title, expense.category, expense.amount, expense.date, expense.type, expense.user)

    def get_expenses(self, user_id):
        return self.database.execute("SELECT title, category, amount, date, type, user_id FROM transactions WHERE user_id = ?", user_id)

    def insert_subscription(self, subscription: Subscription):
        self.database.execute("INSERT INTO subscriptions (title, category, amount, type, start, user_id, period, temporal, next ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                              subscription.title, subscription.category, subscription.amount, subscription.type, subscription.date,
                              subscription.user, subscription.period, subscription.temporal, subscription.next)

    def update_next_subscription(self, id, next):
        self.database.execute(
            "UPDATE subscriptions SET next = ? WHERE id = ?", next, id)

    def get_user_subscriptions(self, user_id) -> Subscription:
        return self.database.execute("SELECT id, title, category, amount, type, start, user_id, period, temporal, next FROM subscriptions WHERE user_id = ?", user_id)

    def get_all_subscriptions(self):
        return self.database.execute("SELECT * FROM subscriptions")

    def delete_subscription(self, id):
        self.database.execute("DELETE FROM subscriptions WHERE id = ?", id)

    def update_subscription(self, subscription: Subscription):
        self.database.execute("UPDATE subscriptions SET title = ?, category = ?, amount = ?, type = ?, user_id = ?, period = ?, temporal = ?, next = ? WHERE id = ?",
                              subscription.title, subscription.category, subscription.amount, subscription.type, 
                              subscription.user, subscription.period, subscription.temporal, subscription.next, subscription.id)
