import os
from datetime import timedelta

curr_dir = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_DATABASE_URI = "sqlite:///"+os.path.join(curr_dir,"mad2.db")
SECRET_KEY = 'secretasguardsecret'
SECURITY_PASSWORD_SALT = 'saltsecretsalt'
SQLALCHEMY_TRACK_MODIFICATIONS = False
WTF_CSRF_ENABLED = False
SECURITY_TOKEN_AUTHENTICATION_HEADER = 'Authentication-Token'
SMTP_HOST = "localhost"
SMTP_PORT = 1025
SENDER_EMAIL = 'madgrocerystore@gmail.com'
SENDER_PASSWORD = 'Qwertyuiop@1'
CACHE_TYPE = "RedisCache"
CACHE_REDIS_HOST = "localhost"
CACHE_REDIS_PORT = 6379
CACHE_REDIS_DB = 3