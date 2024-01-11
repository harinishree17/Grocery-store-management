from backend.instances import cache
from backend.models import *
from flask_restful import marshal_with, fields

class MyDateFormat(fields.Raw):
    def format(self, value):
        return value.strftime('%Y-%m-%d')

product_output = {
    "id" : fields.Integer,
    "category_id" : fields.Integer,
    "name" : fields.String,
    "rate" : fields.Integer,
    "quantity" : fields.Integer,
    "unit" : fields.String,
    "date": MyDateFormat
}

category_output = {
    "id" : fields.Integer,
    "name" : fields.String,
    "products" : fields.Integer
}

bills_output = {
    "id" : fields.Integer,
    "user_id" : fields.Integer,
    "items" : fields.Integer,
    "total" : fields.Integer,
    "date": MyDateFormat
}

user_output = {
    "id" : fields.Integer,
    "name" : fields.String,
    "email" : fields.String,
    "password": fields.String,
    "role": fields.String
}

reqc_output = {
    "id" : fields.Integer,
    "manager_id" : fields.Integer,
    "category_name" : fields.String,
    "is_approved" : fields.Boolean
}

reqd_output = {
    "id" : fields.Integer,
    "manager_id" : fields.Integer,
    "category_id" : fields.Integer,
    "is_approved" : fields.Boolean
}

reqe_output = {
    "id" : fields.Integer,
    "manager_id" : fields.Integer,
    "category_id" : fields.Integer,
    "category_name" : fields.String,
    "is_approved" : fields.Boolean
}

reqm_output = {
    "id" : fields.Integer,
    "name" : fields.String,
    "email" : fields.String,
    "password": fields.String,
}

cart_output = {
    "id" : fields.Integer,
    "product_id" : fields.Integer,
    "product_name" : fields.String,
    "quantity" : fields.Integer,
    "price" : fields.Integer
}

@cache.cached(timeout=600, key_prefix="cacheproducts")
def cacheproducts():
    p = []
    products = Products.query.all()
    for pr in products :
        p.append({
            "id" : pr.id,
            "category_id" : pr.category_id,
            "name" : pr.name,
            "rate" : pr.name,
            "quantity" : pr.quantity,
            "unit" : pr.unit,
            "date": pr.date
        })
    return p

@cache.cached(timeout=600, key_prefix="cachecategories")
@marshal_with(category_output)
def categories():
    category = Category.query.all()
    return category

@cache.cached(timeout=600, key_prefix="cachebills")
@marshal_with(bills_output)
def bills():
    bill = Bills.query.all()
    return bill

@cache.cached(timeout=600, key_prefix="cacheusers")
@marshal_with(user_output)
def users():
    user = Users.query.filter(Users.roles.any(Role.id.in_([3]))).all()
    return user

@cache.cached(timeout=600, key_prefix="managers")
@marshal_with(user_output)
def managers():
    manager = Users.query.filter(Users.roles.any(Role.id.in_([2]))).all()
    return manager

@cache.cached(timeout=600, key_prefix="requestc")
@marshal_with(reqc_output)
def reqc():
    req = Requestc.query.filter_by(is_approved=0).all()
    return req

@cache.cached(timeout=600, key_prefix="requestd")
@marshal_with(reqd_output)
def reqd():
    req = Requestd.query.filter_by(is_approved=0).all()
    return req

@cache.cached(timeout=600, key_prefix="requeste")
@marshal_with(reqe_output)
def reqe():
    req = Requeste.query.filter_by(is_approved=0).all()
    return req

@cache.cached(timeout=600, key_prefix="requestm")
@marshal_with(reqm_output)
def reqm():
    req = Requestm.query.filter_by(is_approved=0).all()
    return req

@cache.cached(timeout=600, key_prefix="cart")
@marshal_with(cart_output)
def cart():
    car = Cart.query.all()
    return car

def clear_cache(key=None):
    if key:
        cache.delete(key)
    else:
        cache.clear()