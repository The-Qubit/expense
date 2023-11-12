from dataclasses import dataclass
from datetime import datetime, timedelta
import secrets

from src.database_manager import DatabaseManager


class SessionManager:
    database_manager = DatabaseManager()

    def new_session(self, user_id):
        token = secrets.token_urlsafe()
        expires = datetime.now() + timedelta(days=1)
        self.database_manager.insert_session(token, expires, user_id)
        return token
        
    def is_valid(self, token):
        session = self.database_manager.get_session(token)
        if session != None and session.expires < datetime.now():
            return True
        return False

    def logout(self, token):
        self.database_manager.update_session(token, datetime.now())