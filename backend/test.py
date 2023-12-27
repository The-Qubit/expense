from datetime import datetime

from dateutil.relativedelta import relativedelta


date = datetime.now()


next = date + relativedelta(days=int(1))

print(next)