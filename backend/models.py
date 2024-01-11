from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin

db = SQLAlchemy()

class Users(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement= True, nullable=False, unique=True)
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(300), nullable=False, unique=True)
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=True)
    active = db.Column(db.Boolean(), default= True)
    roles = db.relationship('Role', secondary='roles_users',backref=db.backref('users', lazy='dynamic'))

class Role(db.Model, RoleMixin):
    __tablename__ = 'role'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)

class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column('user_id', db.Integer(), db.ForeignKey('users.id'))
    role_id = db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))

# class Managers(db.Model):
#     __tablename__ = 'managers'
#     id = db.Column(db.Integer, primary_key=True, autoincrement= True, nullable=False, unique=True)
#     name = db.Column(db.String(100), nullable=False)
#     password = db.Column(db.String(20), nullable=False)
#     email = db.Column(db.String(300), nullable=False, unique=True)

# class Admins(db.Model):
#     __tablename__ = 'admins'
#     id = db.Column(db.Integer, primary_key=True, autoincrement= True, nullable=False, unique=True)
#     name = db.Column(db.String(100), nullable=False)
#     password = db.Column(db.String(20), nullable=False)
#     email = db.Column(db.String(300), nullable=False, unique=True)

class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True, autoincrement= True, nullable=False, unique=True)
    name = db.Column(db.String(50), nullable=False)
    products = db.Column(db.Integer, nullable=False)

class Products(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True, autoincrement= True, nullable=False, unique=True)
    category_id = db.Column(db.Integer, db.ForeignKey("category.id"), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    rate = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(15), nullable=False)
    date = db.Column(db.Date(), nullable=False)

class Bills(db.Model):
    __tablename__ = 'bills'
    id = db.Column(db.Integer, primary_key=True, autoincrement= True, nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    items = db.Column(db.Integer, nullable=False)
    total = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date(), nullable=False)

class Billing(db.Model):
    __tablename__ = 'billing'
    id = db.Column(db.Integer, primary_key=True, autoincrement= True, nullable=False, unique=True)
    bill_id = db.Column(db.Integer, db.ForeignKey("bills.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    product_name = db.Column(db.String(150), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)

class Cart(db.Model):
    __tablename__ = 'cart'
    id = db.Column(db.Integer, primary_key=True, autoincrement= True, nullable=False, unique=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    product_name = db.Column(db.String(150), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)

class Requestd(db.Model):
    __tablename__ = 'requestd'
    id = db.Column(db.Integer, primary_key=True, autoincrement= True, nullable=False, unique=True)
    manager_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("category.id"), nullable=False)
    is_approved = db.Column(db.Boolean(), default=False)

class Requestc(db.Model):
    __tablename__ = 'requestc'
    id = db.Column(db.Integer, primary_key=True, autoincrement= True, nullable=False, unique=True)
    manager_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    category_name = db.Column(db.String(150), nullable=False)
    is_approved = db.Column(db.Boolean(), default=False)

class Requeste(db.Model):
    __tablename__ = 'requeste'
    id = db.Column(db.Integer, primary_key=True, autoincrement= True, nullable=False, unique=True)
    manager_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("category.id"), nullable=False)
    category_name = db.Column(db.String(150), nullable=False)
    is_approved = db.Column(db.Boolean(), default=False)

class Requestm(db.Model):
    __tablename__ = 'requestm'
    id = db.Column(db.Integer, primary_key=True, autoincrement= True, nullable=False, unique=True)
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(300), nullable=False, unique=True)
    is_approved = db.Column(db.Boolean(), default=False)

class Loginlog(db.Model):
    __tablename__ = 'loginlog'
    id = db.Column(db.Integer, primary_key=True, autoincrement= True, nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    date = db.Column(db.Date(), nullable=False)