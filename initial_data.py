from main import app
from backend.security import datastore
from backend.models import db, Category, Products, Requestm, Requestc, Requestd, Requeste, Loginlog
from datetime import datetime

with app.app_context():
    db.create_all()
    # Loginlog.__table__.drop(db)
    # db.session.query(Loginlog).delete()
    # db.session.query(Requestc).delete()
    # db.session.query(Requestd).delete()
    # db.session.query(Requeste).delete()
    # man1 = Managers(name="Elephant", password="12345678", email="manager1@mad.com")
    # db.session.add(man1)
    # man2 = Managers(name="Cheetah", password="12345678", email="manager2@mad.com")
    # db.session.add(man2)
    # ad1 = Admins(name="Lion", password="12345678", email="admin@mad.com")
    # db.session.add(ad1)

    cat1 = Category(name="Dairy", products=2)
    db.session.add(cat1)
    d = datetime(2023, 12, 30, 0, 0, 0, 0)
    prod1 = Products(category_id=1, name="Milk", rate=22, quantity=200, unit="packet", date=d)
    db.session.add(prod1)
    prod2 = Products(category_id=1, name="Curd", rate=25, quantity=100, unit="cup", date=d)
    db.session.add(prod2)
    datastore.find_or_create_role(name="admin")
    datastore.find_or_create_role(name="manager")
    datastore.find_or_create_role(name="user")
    if not datastore.find_user(email="admin@mad.com"):
        datastore.create_user(name="Lion", password="12345678", email="admin@mad.com", roles=["admin"], active=True)
    if not datastore.find_user(email="manager1@mad.com"):
        datastore.create_user(name="Elephant", password="12345678", email="manager1@mad.com", roles=["manager"], active=True)
    if not datastore.find_user(email="manager2@mad.com"):
        datastore.create_user(name="Cheetah", password="12345678", email="manager2@mad.com", roles=["manager"], active=True)
    if not datastore.find_user(email="harinishree219@gmail.com"):
        datastore.create_user(name="Harini", email="harinishree219@gmail.com", password="12345678", roles=["user"], active=True)
    if not datastore.find_user(email="harivenan@gmail.com"):
        datastore.create_user(name="Harivenan", email="harivenan@gmail.com", password="12345678", roles=["user"], active=False)
    try:
        db.session.commit()
    except:
        pass
