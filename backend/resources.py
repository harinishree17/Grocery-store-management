from datetime import datetime
from flask_restful import Resource, Api, fields, marshal_with
from flask import make_response, request,jsonify
from .models import db, Users, Products, Category, Billing, Bills, Requestc, Requestd, Requeste, Cart, Requestm, Role, Loginlog
from flask_security import roles_required, roles_accepted, auth_required
from .security import datastore
from .instances import cache
# from .caching import clear_cache

api = Api()

class MyDateFormat(fields.Raw):
    def format(self, value):
        return value.strftime('%Y-%m-%d')

user_output = {
    "id" : fields.Integer,
    "name" : fields.String,
    "email" : fields.String,
    "password": fields.String,
    "role": fields.String
}

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

cart_output = {
    "id" : fields.Integer,
    "product_id" : fields.Integer,
    "product_name" : fields.String,
    "quantity" : fields.Integer,
    "price" : fields.Integer
}

bills_output = {
    "id" : fields.Integer,
    "user_id" : fields.Integer,
    "items" : fields.Integer,
    "total" : fields.Integer,
    "date": MyDateFormat
}

billing_output = {
    "id" : fields.Integer,
    "bill_id" : fields.Integer,
    "product_id" : fields.Integer,
    "product_name" : fields.String,
    "quantity" : fields.Integer,
    "price" : fields.Integer
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

userlog_output = {
    "id" : fields.Integer,
    "user_id" : fields.Integer,
    "date": MyDateFormat
}

# class Home(Resource):
#     def get(self):
#         return render_template("index.html")

class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data['email']
        password = data['password']
        user = datastore.find_user(password=password,email=email)
        # manager = Managers.query.filter_by(password=password,email=email).first()
        # admin = Admins.query.filter_by(password=password,email=email).first()
        # print("ok")
        if user == None :
        # and manager == None and admin == None:
            return {'message':"Invalid Credentials"}, 400
        cart = Cart.query.all()
        for p in cart:
            db.session.delete(p)
        cache.clear()
        db.session.commit()
        if user != None:
            token = user.get_auth_token()
            current_user = user
            # print(user)
            da = datetime.today()
            daten = str(da)[:10]
            dat = daten.split('-')
            d = datetime(int(dat[0]), int(dat[1]), int(dat[2]), 0, 0, 0, 0)
            if user.has_role("user"):
                role = "user"
                log = Loginlog.query.filter_by(user_id=user.id).first()
                if log != None :
                    log.date = d
                else:
                    log = Loginlog(user_id = user.id, date = d)
                db.session.add(log)
                db.session.commit()
            elif user.has_role("manager"):
                role="manager"
            else:
                role = "admin"
            # print(token)
            return jsonify({'token':token, 'id':user.id, 'role':role})
        # if manager != None:
        #     token = create_access_token(identity=manager.id)
        #     return jsonify({'token':token, 'id':manager.id, 'role':'manager'})
        # if admin != None:
        #     token = create_access_token(identity=admin.id)
        #     return jsonify({'token':token, 'id':admin.id, 'role':'admin'})

class Signup(Resource):
    def post(self):
        # print("in")
        data  = request.get_json()
        email = data['email']
        if Users.query.filter_by(email=email).first() == None :
            name = data['name']
            password = data['password']
            # user = Users(name = name, email = email, password = password, active=True)
            datastore.create_user(name = name, email = email, password = password, active=True, roles=["user"])
            # db.session.add(user)
            cart = Cart.query.all()
            for p in cart:
                db.session.delete(p)
            try:
                db.session.commit()
                user = datastore.find_user(password=password,email=email)
                token = user.get_auth_token()
                if user.has_role("user"):
                    role = "user"
                    da = datetime.today()
                    daten = str(da)[:10]
                    dat = daten.split('-')
                    d = datetime(int(dat[0]), int(dat[1]), int(dat[2]), 0, 0, 0, 0)
                    log = Loginlog.query.filter_by(user_id=user.id).first()
                    if log != None :
                        log.date = d
                    else:
                        log = Loginlog(user_id = user.id, date = d)
                    db.session.add(log)
                    db.session.commit()
                elif user.has_role("manager"):
                    role="manager"
                else:
                    role = "admin"
                return jsonify({'token':token, 'id':user.id, 'role':role})
            except:
                return {'message':"User duplicated"}, 400

# class Admin(Resource):
#     @auth_required("token")
#     @roles_required("admin")
#     def admin():
#         return "Hsii there"

class Productslist(Resource):
    @auth_required("token")
    @marshal_with(product_output)
    def get(self):
        # print("got in ")
        products = Products.query.order_by(Products.id.desc()).all()
        return products

class Categories(Resource):
    @auth_required("token")
    @marshal_with(category_output)
    def get(self):
        categories = Category.query.order_by(Category.id.desc()).all()
        return categories

class CartItems(Resource):
    @auth_required("token")
    @marshal_with(cart_output)
    def get(self):
        cart = Cart.query.all()
        return cart

class CartTotal(Resource):
    @auth_required("token")
    def get(self):
        cart = Cart.query.all()
        total= 0
        for i in cart:
            total = total + i.quantity *i.price
        return total

class Billsdetails(Resource):
    @auth_required("token")
    @marshal_with(bills_output)
    def get(self, id):
        bills = Bills.query.filter_by(user_id=id).all()
        return bills

class Billtotal(Resource):
    @auth_required("token")
    @marshal_with(bills_output)
    def get(self, id):
        bills = Bills.query.filter_by(id=id).first()
        return bills

class Billdetails(Resource):
    @auth_required("token")
    @marshal_with(billing_output)
    def get(self, id):
        billing = Billing.query.filter_by(bill_id=id).all()
        return billing

class AllBills(Resource):
    @auth_required("token")
    @roles_accepted("manager", "admin")
    @marshal_with(bills_output)
    def get(self):
        bills = Bills.query.all()
        return bills

class Createrequests(Resource):
    @auth_required("token")
    @roles_required("admin")
    @marshal_with(reqc_output)
    def get(self,):
        req = Requestc.query.filter_by(is_approved=0).all()
        return req

class Creater(Resource):
    @auth_required("token")
    @roles_accepted("manager", "admin")
    @marshal_with(reqc_output)
    def get(self, id):
        req = Requestc.query.filter_by(manager_id=id).all()
        return req

class Deleterequests(Resource):
    @auth_required("token")
    @roles_required("admin")
    @marshal_with(reqd_output)
    def get(self):
        req = Requestd.query.filter_by(is_approved=0).all()
        return req

class Deleter(Resource):
    @auth_required("token")
    @roles_accepted("manager", "admin")
    @marshal_with(reqd_output)
    def get(self, id):
        req = Requestd.query.filter_by(manager_id=id).all()
        return req

class Editrequests(Resource):
    @auth_required("token")
    @roles_required("admin")
    @marshal_with(reqe_output)
    def get(self):
        req = Requeste.query.filter_by(is_approved=0).all()
        return req

class Editr(Resource):
    @auth_required("token")
    @roles_accepted("manager", "admin")
    @marshal_with(reqe_output)
    def get(self, id):
        req = Requeste.query.filter_by(manager_id=id).all()
        return req

class Managerequests(Resource):
    @auth_required("token")
    @roles_required("admin")
    @marshal_with(reqm_output)
    def get(self):
        req = Requestm.query.filter_by(is_approved=0).all()
        return req

class AddProduct(Resource):
    @auth_required("token")
    @roles_required("manager")
    @marshal_with(product_output)
    def post(self):
        data  = request.get_json()
        n = data["name"]
        c = data["category_id"]
        r = data["rate"]
        q = data["quantity"]
        u = data["unit"]
        da = data["date"]
        dat = da.split("-")
        # print(da)
        d = datetime(int(dat[0]), int(dat[1]), int(dat[2]), 0, 0, 0, 0)
        if (d < datetime.now()):
            new_product = Products(category_id = c,name=n, rate=r, quantity=q, unit=u, date=d)
            category = Category.query.filter_by(id=c).first()
            if(category == None):
                return {'message':"Category doesn't exist"}, 400
            try:
                db.session.add(new_product)
                category.products= category.products+1
                db.session.add(category)
                db.session.commit()
                cache.clear()
                return new_product
            except:
                return {'message':"Error while creating product"}, 400
        else:
            return {'message':"Recheck manufacturing date"}, 400

class AddCategory(Resource):
    @auth_required("token")
    @roles_required("admin")
    @marshal_with(category_output)
    def post(self):
        data  = request.get_json()
        n = data["name"]
        p = 0
        category = Category.query.filter_by(name=n).first()
        if(category != None):
            return {'message':"Category already exist"}, 400
        new_category = Category(name = n, products=p)
        try:
            db.session.add(new_category)
            db.session.commit()
            cache.clear()
            return new_category
        except:
            return {'message':"Error while creating category"}, 400

class AddManager(Resource):
    @auth_required("token")
    @roles_required("admin")
    @marshal_with(user_output)
    def post(self):
        data  = request.get_json()
        try:
            email = data['email']
            name = data['name']
            password = data['password']
            user = Users(name = name, email = email, password = password, active=True)
            datastore.create_user(name = name, email = email, password = password, active=True, roles=["manager"])
            db.session.add(user)
        except:
            return {'message':"Missing details"}, 400
        try:
            db.session.commit()
            user = datastore.find_user(password=password,email=email)
            token = user.get_auth_token()
            cache.clear()
            return jsonify({'token':token, 'id':user.id})
        except:
            return {'message':"User duplicated"}, 400

class Categorydetails(Resource):
    @auth_required("token")
    @marshal_with(category_output)
    def get(self, id):
        try :
            category = Category.query.filter_by(id=id).first()
            if category == None:
                return {'message':"Category doesn't exist"}, 400
            return category
        except:
            return {'message':"Category Error"}, 400

class Productdetails(Resource):
    @auth_required("token")
    @marshal_with(product_output)
    def get(self, id):
        try:
            product = Products.query.filter_by(id=id).first()
            if product == None:
                return {'message':"Product doesn't exist"}, 400
            return product
        except:
            return {'message':"Product Error"}, 400

class Productbycategory(Resource):
    @auth_required("token")
    @marshal_with(product_output)
    def get(self, id):
        try:
            product = Products.query.filter_by(category_id=id).all()
            # print(product)
            if product == None:
                return {'message':"No products in category"}, 200
            return product
        except:
            return {'message':"Category Error"}, 400

class DeleteProduct(Resource):
    @auth_required("token")
    @roles_required("manager")
    @marshal_with(product_output)
    def delete(self, id):
        product = Products.query.filter_by(id=id).first()
        if(product==None):
            return {'message':"Product doesn't exist"}, 400
        db.session.delete(product)
        category = Category.query.filter_by(id=product.category_id).first()
        category.products = category.products - 1
        db.session.add(category)
        db.session.commit()
        cache.clear()
        return product

class DeleteCategory(Resource):
    @auth_required("token")
    @roles_required("admin")
    @marshal_with(category_output)
    def delete(self, id):
        category = Category.query.filter_by(id=id).first()
        if(category==None):
            return {'message':"Category doesn't exist"}, 400
        db.session.delete(category)
        products = Products.query.filter_by(category_id=id)
        for p in products:
            db.session.delete(p)
        db.session.commit()
        cache.clear()
        return category

class EditProduct(Resource):
    @auth_required("token")
    @roles_required("manager")
    @marshal_with(product_output)
    def post(self, id):
        product = Products.query.filter_by(id=id).first()
        
        if(product==None):
            return {'message':"Product doesn't exist"}, 400
        
        data  = request.get_json()
        n = data["name"]
        c = data["category_id"]
        r = data["rate"]
        q = data["quantity"]
        u = data["unit"]
        da = data["date"]
        dat = da.split("-")
        d = datetime(int(dat[0]), int(dat[1]), int(dat[2]), 0, 0, 0, 0)
        product.name = n
        product.category_id = c
        product.rate = r
        product.quantity = q
        product.unit = u
        product.date = d
        # if (d < datetime.now()):
            # print("yu in !")
        db.session.add(product)
        db.session.commit()
        cache.clear()
        return product
        # else:
            # return {'message':"Check manufacturing date"}, 400

class EditCategory(Resource):
    @auth_required("token")
    @roles_required("admin")
    @marshal_with(category_output)
    def post(self, id):
        category = Category.query.filter_by(id=id).first()
        if(category==None):
            return {'message':"Category doesn't exist"}, 400
        data  = request.get_json()
        n = data["name"]
        category.name = n
        db.session.add(category)
        db.session.commit()
        cache.clear()
        return category

class Billit(Resource):
    @auth_required("token")
    @roles_required("user")
    def post(self, id):
        cart = Cart.query.all()
        if(len(cart)==0):
            return {'message':"Cart empty"}
        bill_id = 1+len(Bills.query.all())
        total = 0
        items = 0
        for c in cart:
            new_billing = Billing(bill_id = bill_id, product_id = c.product_id, product_name= c.product_name, quantity= c.quantity, price = c.price)
            total = total + c.quantity*c.price
            items = items + c.quantity
            db.session.add(new_billing)
            db.session.commit()
        da= str(datetime.today())
        daten = da[:10]
        dat = daten.split('-')
        d = datetime(int(dat[0]), int(dat[1]), int(dat[2]), 0, 0, 0, 0)
        new_bill = Bills(user_id = id, items = items, total=total, date = d)
        db.session.add(new_bill)
        for c in cart:
            prod = Products.query.filter_by(id=c.product_id).first()
            prod.quantity = prod.quantity - c.quantity
            db.session.add(prod)
            db.session.delete(c)
        db.session.commit()
        cache.clear()
        return {'message':"Bill added"}

class Addtocart(Resource):
    @auth_required("token")
    @roles_required("user")
    @marshal_with(cart_output)
    def post(self, id):
        prod = Cart.query.filter_by(product_id=id).first()
        if(prod == None):
            product = Products.query.filter_by(id=id).first()
            n = product.name
            q = 1
            p = product.rate
            new_cart = Cart(product_id = id, product_name = n, quantity=q, price=p)
            db.session.add(new_cart)
            db.session.commit()
            cart = Cart.query.all()
            cache.clear()
            return cart
        else:
            product = Cart.query.filter_by(product_id=id).first()
            prod.quantity = prod.quantity + 1
            db.session.add(prod)
            db.session.commit()
            cart = Cart.query.all()
            cache.clear()
            return cart

class Removefromcart(Resource):
    @auth_required("token")
    @roles_required("user")
    @marshal_with(cart_output)
    def post(self, id):
        prod = Cart.query.filter_by(product_id=id).first()
        if(prod == None):
            return {'message':"Product doesn't exist in cart"}
        if prod.quantity == 1:
            db.session.delete(prod)
            db.session.commit()
            cart = Cart.query.all()
            cache.clear()
            return cart
        else:
            product = Cart.query.filter_by(product_id=id).first()
            prod.quantity = prod.quantity - 1
            db.session.add(prod)
            db.session.commit()
            cart = Cart.query.all()
            cache.clear()
            return cart

def productformat(product):
    result = {
        "id" : product.id,
        "category_id" : product.category_id,
        "name" : product.name,
        "rate" : product.rate,
        "quantity" : product.quantity,
        "unit" : product.unit,
        "date": product.date
    }
    return result

def categoryformat(product):
    result = {
        "id" : product.id,
        "name" : product.name,
        "products": product.products
    }
    return result

class Search(Resource):
    @auth_required("token")
    def get(self, name):
        prodbyname = []
        prodbyid = []
        prodbyunit = []
        prodbyrate = []
        prodbyquantity = []
        prodbydate = []
        catbyname = []
        catbyid = []
        products = Products.query.all()
        categories = Category.query.all()
        # print("okinmji")
        for c in categories:
            if name in c.name:
                temp = categoryformat(c)
                catbyname.append(temp)
            try:
                if int(name) == c.id:
                    temp = categoryformat(c)
                    catbyid.append(temp)
            except:
                pass
        for p in products:
            if name in p.name:
                temp = productformat(p)
                prodbyname.append(temp)
            if name in p.unit:
                temp = productformat(p)
                prodbyunit.append(temp)
            if name == str(p.date):
                temp = productformat(p)
                prodbydate.append(temp)
            try:
                if int(name) == p.id:
                    temp = productformat(p)
                    prodbyid.append(temp)
                if int(name) == p.rate:
                    temp = productformat(p)
                    prodbyrate.append(temp)
                if int(name) == p.quantity:
                    temp = productformat(p)
                    prodbyquantity.append(temp)
            except:
                pass
        data = {"prodbyname":prodbyname, "prodbyid":prodbyid, "prodbyunit":prodbyunit, "prodbyrate":prodbyrate, "prodbyquantity":prodbyquantity, "prodbydate":prodbydate, "catbyname":catbyname, "catbyid":catbyid}
        response = make_response(jsonify(data))
        response.headers.add("Access-Control-Allow-Origin","*")
        return response
        # return prodbyname
        # return prodbyname, prodbyid, prodbyunit, prodbyrate, prodbyquantity, prodbydate, catbyname, catbyid

class Change(Resource):
    @auth_required("token")
    @roles_required("admin")
    def post(self, req_type):
        data  = request.get_json()
        if req_type == "edit":
            id = data["id"]
            name = data["name"]
            category = Category.query.filter_by(id=id).first()
            if(category==None):
                return {'message':"Category doesn't exist"}, 400
            category.name = name
            db.session.add(category)
            db.session.commit()
            req = Requeste.query.filter_by(category_name=name).first()
            req.is_approved = 1
            db.session.add(req)
            db.session.commit()
            cache.clear()
            return "success"
        elif req_type == "create":
            name = data["name"]
            p = 0
            category = Category.query.filter_by(name=name).first()
            if(category != None):
                return {'message':"Category already exist"}, 400
            new_category = Category(name = name, products=p)
            try:
                db.session.add(new_category)
                db.session.commit()
                req = Requestc.query.filter_by(category_name=name).first()
                req.is_approved = 1
                db.session.add(req)
                db.session.commit()
                cache.clear()
                return "success"
            except:
                return {'message':"Error while creating category"}, 400
        elif req_type == "manager":
            data  = request.get_json()
            email = data['email']
            name = data['name']
            password = data['password']
            user = datastore.find_user(password=password,email=email)
            if user == None:
                user = Users(name = name, email = email, password = password, active=True)
                datastore.create_user(name = name, email = email, password = password, active=True, roles=["manager"])
                try:
                    db.session.commit()
                    user = datastore.find_user(password=password,email=email)
                    token = user.get_auth_token()
                    req = Requestm.query.filter_by(email=user.email).first()
                    req.is_approved = 1
                    db.session.add(req)
                    db.session.commit()
                    cache.clear()
                    return jsonify({'token':token, 'id':user.id})
                except:
                    return {'message':"User duplicated"}, 400
        elif req_type == "delete":
            id = data["id"]
            category = Category.query.filter_by(id=id).first()
            if(category==None):
                return {'message':"Category doesn't exist"}, 400
            db.session.delete(category)
            products = Products.query.filter_by(category_id=id)
            for p in products:
                db.session.delete(p)
            db.session.commit()
            req = Requestd.query.filter_by(category_id=id).first()
            req.is_approved = 1
            db.session.add(req)
            db.session.commit()
            cache.clear()
            return "success"

class Userslist(Resource):
    @auth_required("token")
    @roles_required("admin")
    @marshal_with(user_output)
    def get(self):
        users = Users.query.filter(Users.roles.any(Role.id.in_([3]))).all()
        return users

class Managerslist(Resource):
    @auth_required("token")
    @roles_required("admin")
    @marshal_with(user_output)
    def get(self):
        users = Users.query.filter(Users.roles.any(Role.id.in_([2]))).all()
        return users

class Categorycreaterequest(Resource):
    @auth_required("token")
    @roles_required("manager")
    def post(self):
        data  = request.get_json()
        # print(data)
        manager_id = data["id"]
        category_name = data["name"]
        category = Category.query.filter_by(name=category_name).first()
        if(category == None):
            new_requestc = Requestc(manager_id = manager_id, category_name=category_name)
            try:
                db.session.add(new_requestc)
                db.session.commit()
                cache.clear()
                return {'message':"Successfully requested !"}, 200
            except:
                return {'message':"Error while creating request"}, 400

class Managercreaterequest(Resource):
    @auth_required("token")
    @roles_required("manager")
    def post(self):
        data  = request.get_json()
        name = data["name"]
        password = data["password"]
        email = data["email"]
        # print(data)
        manager = Users.query.filter_by(email=email).first()
        if(manager == None):
            new_requestm = Requestm(name=name, email=email, password=password)
            try:
                db.session.add(new_requestm)
                db.session.commit()
                cache.clear()
                return {'message':"Successfully requested !"}, 200
            except:
                return {'message':"Error while creating request"}, 400

class Categoryeditrequest(Resource):
    @auth_required("token")
    @roles_required("manager")
    def post(self):
        data  = request.get_json()
        manager_id = data["id"]
        category_id = data["category_id"]
        category_name = data["name"]
        category = Category.query.filter_by(id=category_id).first()
        if(category != None):
            new_requeste = Requeste(manager_id = manager_id, category_id = category_id, category_name=category_name)
            try:
                db.session.add(new_requeste)
                db.session.commit()
                cache.clear()
                return {'message':"Successfully requested !"}, 200
            except:
                return {'message':"Error while creating request"}, 400

class Categorydeleterequest(Resource):
    @auth_required("token")
    @roles_required("manager")
    def post(self):
        data  = request.get_json()
        manager_id = data["id"]
        category_id = data["category_id"]
        category = Category.query.filter_by(id=category_id).first()
        if(category != None):
            new_requestd = Requestd(manager_id = manager_id, category_id = category_id)
            try:
                db.session.add(new_requestd)
                db.session.commit()
                cache.clear()
                return {'message':"Successfully requested !"}, 200
            except:
                return {'message':"Error while creating request"}, 400

class Userslog(Resource):
    @marshal_with(userlog_output)
    def get(self):
        users = Loginlog.query.all()
        return users