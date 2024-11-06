from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()
def get_uuid():
    return uuid4().hex

class user(db.Model):
    __tablename__ ='user'
    id = db.Column(db.String, primary_key=True,unique=True, default=get_uuid)
    name = db.Column(db.String(200), nullable=False)
    email=db.Column(db.String(345), nullable=False, unique=True)
    password=db.Column(db.Text, nullable=False)

