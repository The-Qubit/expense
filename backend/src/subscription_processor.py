import logging
import time

from datetime import datetime
from dateutil.relativedelta import relativedelta
from src.modell import Expense

from src.database_manager import DatabaseManager


def debit_subscriptions():
    while(True):
        database = DatabaseManager()
        subscriptions = database.get_all_subscriptions()

        for subscription in subscriptions:
            if subscription["next"] == datetime.now().strftime("%Y-%m-%d"):
                expense = Expense(subscription["title"], subscription["category"], subscription["amount"],  subscription["next"], subscription["user_id"])
                database.insert_expense(expense)

                database.update_next_subscription(subscription["id"], calculate_next(subscription["next"], subscription["period"], subscription["temporal"]))

        DAY = 24 * 60 * 60  
        time.sleep(DAY)
        

def calculate_next(last, period, temporal):
    date = datetime.strptime(last, '%Y-%m-%d')
    next = None

    if temporal == "y":
        next = date + relativedelta(year=int(period))
    elif temporal == "m":
        next = date + relativedelta(month=int(period))
    else:
        next = date + relativedelta(day=int(period))
    
    return next
