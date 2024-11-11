from flask import Flask, request, jsonify, session
from flask_cors import CORS
from models import User as UserModel, db  # Renaming 'user' to 'UserModel' to avoid conflicts
import redis
from flask_bcrypt import Bcrypt
from flask_session import Session

app = Flask(__name__)

# Flask app configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'thisissecret'
app.config['SQLALCHEMY_ECHO'] = True

# Session configuration
app.config['SESSION_TYPE'] = 'redis'  
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = redis.from_url("redis://127.0.0.1:6379/0")

# Initialize Bcrypt and Session
bcrypt = Bcrypt(app)
server_session = Session(app)

# Initialize SQLAlchemy
db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

# Enable CORS
CORS(app, supports_credentials=True)

@app.route("/@me", methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({'error': 'user unauthorized'}), 401
    user = UserModel.query.filter_by(id=user_id).first()
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({
        "name": user.name,
        "email": user.email
    })

@app.route('/register', methods=['POST'])
def add_user():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    
    # Check if user already exists
    user_exists = UserModel.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({'error': 'User already exists'}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = UserModel(name=name, email=email, password=hashed_password)

    # Add user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "name": new_user.name,
        "email": new_user.email
    })

@app.route('/login', methods=['POST'])
def login_user():
    email = request.json['email']
    password = request.json['password']
    
    # Fetch the user from the database
    user_instance = UserModel.query.filter_by(email=email).first()
    if user_instance is None:
        return jsonify({'error': 'User not found'}), 404
    
    # Check if password is correct
    if not bcrypt.check_password_hash(user_instance.password, password):
        return jsonify({'error': 'Incorrect password'}), 401
    
    # Store user ID in the session
    session['user_id'] = user_instance.id
    
    return jsonify({
        "name": user_instance.name,
        "email": user_instance.email
    })

if __name__ == '__main__':
    app.run(debug=True)
