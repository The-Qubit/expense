from cs50 import SQL

from src.modell import Session


class DatabaseManager():
    database = SQL("sqlite:///database.db")

    def get_user(self, email):
        user = self.database.execute("SELECT * FROM users WHERE email = ?", email)
        if len(user) == 0:
            return None
        return user[0]
    
    def get_used_emails(self):
        return self.database.execute("SELECT email FROM users")

    def insert_user(self, email, hash):
        return self.database.execute("INSERT INTO users (email, hash) VALUES (?, ?)", email, hash)
    
    def get_session(self, token) -> Session: 
        session = self.database.execute("SELECT * FROM sessions WHERE token = ?", token)
        if len(session) == 0:
            return None
        return session[0]
    
    def insert_session(self, token, expires, user_id):
        return self.database.execute("INSERT INTO sessions (token, expires, user_id) VALUES (?, ?, ?)", token, expires, user_id)

    def update_session(self, token, expires):
        return self.database.execute("UPDATE sessions SET expires = ? WHERE token = ?", expires, token)