from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

# Helper function to generate UUID
def get_uuid():
    return uuid4().hex  # generates a 32-character hexadecimal UUID string

class User(db.Model):
    __tablename__ = 'user'  # Naming the table explicitly

    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(345), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)  # Changed to String(255)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
