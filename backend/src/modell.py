from dataclasses import dataclass
from datetime import datetime, date


@dataclass
class Session():
    id: int
    token: str
    expires: datetime
    user_id: int

@dataclass
class Transaction():
    id: int
    title: str
    category: str
    amount: float
    date: date
    type: str
    user: int

@dataclass
class Subscription(Transaction):
    period: int
    temporal: str
    next: date

@dataclass
class User():
    id: int
    email: str
    hash: str
