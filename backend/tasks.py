import os
from celery import shared_task
import flask_excel as excel
from .models import Billing, Bills, Products, Role
from .mail_service import send_message
from .models import Loginlog, Users
from datetime import datetime, timedelta, date
from jinja2 import Template

@shared_task(ignore_result=False)
def dlcsv():
    req = Products.query.all()
    csv = excel.make_response_from_query_sets(req, ["id","category_id", "name", "rate", "quantity", "unit", "date"], "csv")
    filename="Products_report.csv"
    with open(filename, 'wb') as f:
        f.write(csv.data)
    return filename

@shared_task(ignore_result=True)
def daily_reminder(subject):
    ul = Loginlog.query.all()
    da  = datetime.now()-timedelta(days=1)
    daten = str(da)[:10]
    dat = daten.split('-')
    d = datetime(int(dat[0]), int(dat[1]), int(dat[2]), 0, 0, 0, 0)
    for u in ul :
        udaten = str(u.date)[:10]
        udat = udaten.split('-')
        ud = datetime(int(dat[0]), int(dat[1]), int(dat[2]), 0, 0, 0, 0)
        if ud<d :
            fail = Users.query.filter_by(id=u.user_id).first()
            file = os.path.abspath(os.path.dirname(__file__))+"/useremail.html"
            with open(file, 'r') as f:
                template = Template(f.read())
                send_message(fail.email, subject,template.render(name=fail.name))
    return "OK"

@shared_task(ignore_result=True)
def report(subject):
    users = Users.query.filter(Users.roles.any(Role.id.in_([3]))).all()
    today = datetime.now()-timedelta(days=1)
    y = str(today)[:4]
    m = str(today)[5:7]
    d = str(today)[8:10]
    start= date(year=int(y),month=int(m),day=1)
    end= date(year=int(y),month=int(m),day=int(d))
    for user in users:
        bills = Bills.query.filter(Bills.date>=start, Bills.date<=end, Bills.user_id==user.id).all()
        if bills != []:
            file = os.path.abspath(os.path.dirname(__file__))+"/reportemail.html"
            with open(file, 'r') as f:
                template = Template(f.read())
                send_message(user.email, subject,template.render(name=user.name,bills=bills))
    return "OK"