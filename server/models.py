from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from uuid import uuid4

db = SQLAlchemy()

# Helper function to generate UUID
def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(345), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)

    # Relationships
    foods = db.relationship('Food', backref='user', lazy=True)
    likes = db.relationship('Like', backref='user', lazy=True)
    comments = db.relationship('Comment', backref='user', lazy=True)
    ratings = db.relationship('Rating', backref='user', lazy=True)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

    def __repr__(self):
        return f"<User {self.name}>"


class Food(db.Model):
    __tablename__ = 'foods'

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255), nullable=False)
    food_name = db.Column(db.String(100), nullable=False)
    food_type = db.Column(db.String(50), nullable=False)
    food_country = db.Column(db.String(50), nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    preparation_steps = db.Column(db.Text, nullable=False)
    cooking_time = db.Column(db.String(100), nullable=False)
    cooking_method = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # Foreign key and relationship to User
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)

    # Relationships
    likes = db.relationship('Like', backref='food', lazy=True)
    comments = db.relationship('Comment', backref='food', lazy=True)
    ratings = db.relationship('Rating', backref='food', lazy=True)

    def __init__(self, image_url, food_name, food_type, food_country, ingredients, preparation_steps, cooking_time, cooking_method, rating, user_id):
        self.image_url = image_url
        self.food_name = food_name
        self.food_type = food_type
        self.food_country = food_country
        self.ingredients = ingredients
        self.preparation_steps = preparation_steps
        self.cooking_time = cooking_time
        self.cooking_method = cooking_method
        self.rating = rating
        self.user_id = user_id

    def __repr__(self):
        return f"<Food {self.food_name}>"


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)
    food_id = db.Column(db.Integer, db.ForeignKey('foods.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Like User:{self.user_id} Food:{self.food_id}>"


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())

    # Foreign keys
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)
    food_id = db.Column(db.Integer, db.ForeignKey('foods.id'), nullable=False)

    def __repr__(self):
        return f"<Comment {self.content[:20]}...>"


class Rating(db.Model):
    __tablename__ = 'ratings'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Foreign keys
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)
    food_id = db.Column(db.Integer, db.ForeignKey('foods.id'), nullable=False)

    def __repr__(self):
        return f"<Rating {self.rating} User:{self.user_id} Food:{self.food_id}>"
