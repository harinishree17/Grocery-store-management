from flask_security import SQLAlchemyUserDatastore
from .models import db, Users, Role
datastore = SQLAlchemyUserDatastore(db, Users, Role)