from dataclasses import dataclass
from datetime import datetime, date


@dataclass
class Session():
    id: int
    token: str
    expires: datetime
    user_id: int

@dataclass
class Expense():
    title: str
    category: str
    amount: float
    date: date
    user: int

@dataclass
class Subscription(Expense):
    period: int
    temporal: str
    next: date

@dataclass
class User():
    id: int
    email: str
    hash: str
