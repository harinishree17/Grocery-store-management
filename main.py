from flask import Flask, jsonify, render_template, send_file
from backend.models import db
import config
from backend import api
from backend.security import datastore
from flask_security import Security
from backend.worker import celery_init_app
import flask_excel as excel
from backend.models import Products
from backend.tasks import dlcsv, daily_reminder, report
from celery.result import AsyncResult
from celery.schedules import crontab
from backend.instances import cache

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    db.init_app(app)
    api.init_app(app)
    excel.init_excel(app)
    app.security = Security(app, datastore)
    cache.init_app(app)
    app.app_context().push()
    return app

app= create_app()
celery_app = celery_init_app(app)

@celery_app.on_after_configure.connect
def send_email(sender, **kwargs):
    sender.add_periodic_task(
        crontab(hour=10, minute=28),
        daily_reminder.s('Hai from MAD Groceries !!')
    )

@celery_app.on_after_configure.connect
def send_report(sender, **kwargs):
    sender.add_periodic_task(
        crontab(hour=10, minute=28, day_of_month=31),
        report.s('Know your expenses !!')
    )

@app.route('/')
def home_():
    return render_template('index.html')

@app.get('/dcsv')
def dcsv():
    task = dlcsv.delay()
    return jsonify({"task-id": task.id})

@app.get('/get-csv/<task_id>')
def get_csv(task_id):
    res = AsyncResult(task_id)
    if res.ready():
        filename = res.result
        return send_file(filename, as_attachment=True)
    else:
        return jsonify({"message": "Task Pending"}), 404

if __name__ == "__main__":
    app.run(debug=True)