from dataclasses import dataclass
from datetime import datetime


@dataclass
class Session():
    id: int
    token: str
    expires: datetime
    user_id: int
