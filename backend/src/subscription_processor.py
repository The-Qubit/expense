import logging
import time

from datetime import datetime
from dateutil.relativedelta import relativedelta
from src.modell import Subscription, Transaction

from src.database_manager import DatabaseManager


def debit_subscriptions():
    while (True):
        database = DatabaseManager()
        subscriptions = database.get_all_subscriptions()

        for subscription in subscriptions:
            if subscription["next"] == datetime.now().strftime("%Y-%m-%d"):
                
                transaction = transactionFromSubscription(subscription)
                database.insert_transaction(transaction)

                database.update_next_subscription(subscription["id"], calculate_next(
                    subscription["next"], subscription["period"], subscription["temporal"]))

        DAY = 24 * 60 * 60
        time.sleep(DAY)

def transactionFromSubscription(subscription) -> Transaction:
    transaction = Transaction(subscription["title"], subscription["category"], subscription["amount"], subscription["next"], subscription["type"],subscription["user_id"])

    return transaction

def calculate_next(last, period, temporal):
    date = datetime.strptime(last, '%Y-%m-%d')
    next = None

    if temporal == "y":
        next = date + relativedelta(years=int(period))
    elif temporal == "m":
        next = date + relativedelta(months=int(period))
    else:
        next = date + relativedelta(days=int(period))

    return next.strftime('%Y-%m-%d')
