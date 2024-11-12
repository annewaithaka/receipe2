# from flask import Flask, request, jsonify, session,send_from_directory
# from flask_cors import CORS
# from models import User as UserModel, db,Food,Like,Comment,Rating  # Renaming 'user' to 'UserModel' to avoid conflicts
# import redis
# from flask_bcrypt import Bcrypt
# from flask_session import Session
# from werkzeug.utils import secure_filename
# import os

# app = Flask(__name__)

# # Flask app configuration
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SECRET_KEY'] = 'thisissecret'
# app.config['SQLALCHEMY_ECHO'] = True
# app.config['UPLOAD_FOLDER'] = 'uploads'
# # Session configuration
# app.config['SESSION_TYPE'] = 'redis'  
# app.config['SESSION_PERMANENT'] = False
# app.config['SESSION_USE_SIGNER'] = True
# app.config['SESSION_REDIS'] = redis.from_url("redis://127.0.0.1:6379/0")

# # Initialize Bcrypt and Session
# bcrypt = Bcrypt(app)
# server_session = Session(app)

# # Initialize SQLAlchemy
# db.init_app(app)

# # Create tables
# with app.app_context():
#     db.create_all()

# # Enable CORS
# CORS(app, supports_credentials=True)

# def get_logged_in_user():
#     user_id = session.get("user_id")
#     if not user_id:
#         return None
#     return UserModel.query.get(user_id)

# @app.route("/@me", methods=["GET"])
# def get_current_user():
#     user_id = session.get("user_id")
#     if not user_id:
#         return jsonify({'error': 'user unauthorized'}), 401
#     user = UserModel.query.filter_by(id=user_id).first()
#     if user is None:
#         return jsonify({'error': 'User not found'}), 404
#     return jsonify({
#         "name": user.name,
#         "email": user.email
#     })

# @app.route('/register', methods=['POST'])
# def add_user():
#     name = request.json['name']
#     email = request.json['email']
#     password = request.json['password']
    
#     # Check if user already exists
#     user_exists = UserModel.query.filter_by(email=email).first() is not None
#     if user_exists:
#         return jsonify({'error': 'User already exists'}), 400

#     # Hash the password
#     hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
#     new_user = UserModel(name=name, email=email, password=hashed_password)

#     # Add user to the database
#     db.session.add(new_user)
#     db.session.commit()

#     return jsonify({
#         "name": new_user.name,
#         "email": new_user.email
#     })

# @app.route('/login', methods=['POST'])
# def login_user():
#     email = request.json['email']
#     password = request.json['password']
    
#     # Fetch the user from the database
#     user_instance = UserModel.query.filter_by(email=email).first()
#     if user_instance is None:
#         return jsonify({'error': 'User not found'}), 404
    
#     # Check if password is correct
#     if not bcrypt.check_password_hash(user_instance.password, password):
#         return jsonify({'error': 'Incorrect password'}), 401
    
#     # Store user ID in the session
#     session['user_id'] = user_instance.id
    
#     return jsonify({
#         "name": user_instance.name,
#         "email": user_instance.email
#     })


# @app.route('/logout', methods=['POST'])
# def logout_user():
#     # Remove user ID from the session
#     session.pop('user_id', None)
    
#     return jsonify({'message': 'User logged out'})



# @app.route('/foods', methods=['GET', 'POST'])
# def foods():
#     if request.method == 'GET':
#         foods = Food.query.all()
#         return jsonify([{
#             "id": food.id,
#             "image_url": food.image_url,
#             "food_name": food.food_name,
#             "food_type": food.food_type,
#             "food_country": food.food_country,
#             "ingredients": food.ingredients,
#             "preparation_steps": food.preparation_steps,
#             "cooking_time": food.cooking_time,
#             "cooking_method": food.cooking_method,
#             "rating": food.rating
#         } for food in foods])

#     if request.method == 'POST':
#         user = get_logged_in_user()
#         if not user:
#             return jsonify({'error': 'User unauthorized'}), 401

#         if 'image' not in request.files:
#             return jsonify({'error': 'No image uploaded'}), 400

#         image = request.files['image']
#         image_filename = secure_filename(image.filename)
#         image.save(os.path.join(app.config['UPLOAD_FOLDER'], image_filename))

#         data = request.form
#         new_food = Food(
#             image_url=image_filename,
#             food_name=data['food_name'],
#             food_type=data['food_type'],
#             food_country=data['food_country'],
#             ingredients=data['ingredients'],
#             preparation_steps=data['preparation_steps'],
#             cooking_time=data['cooking_time'],
#             cooking_method=data['cooking_method'],
#             rating=int(data.get('rating', 0)),
#             user_id=user.id
#         )
#         db.session.add(new_food)
#         db.session.commit()

#         return jsonify({
#             "id": new_food.id,
#             "image_url": new_food.image_url,
#             "food_name": new_food.food_name,
#             "food_type": new_food.food_type,
#             "food_country": new_food.food_country,
#             "ingredients": new_food.ingredients,
#             "preparation_steps": new_food.preparation_steps,
#             "cooking_time": new_food.cooking_time,
#             "cooking_method": new_food.cooking_method,
#             "rating": new_food.rating
#         }), 201


# @app.route('/uploads/<filename>')
# def get_image(filename):
#     return send_from_directory(app.config['UPLOAD_FOLDER'], filename)






# @app.route('/foods/<int:id>', methods=['PUT'])
# def update_food(id):
#     user_id = session.get("user_id")
#     food = Food.query.filter_by(id=id, user_id=user_id).first()
#     if not food:
#         return jsonify({'error': 'Food not found or unauthorized'}), 404

#     data = request.json
#     food.food_name = data['food_name']
#     food.food_type = data['food_type']
#     food.food_country = data['food_country']
#     food.ingredients = data['ingredients']
#     food.preparation_steps = data['preparation_steps']
#     food.cooking_time = data['cooking_time']
#     food.cooking_method = data['cooking_method']
#     food.rating = data['rating']
#     db.session.commit()

#     return jsonify({'message': 'Food updated successfully!'})


# @app.route('/foods/<int:id>', methods=['DELETE'])
# def delete_food(id):
#     user_id = session.get("user_id")
#     food = Food.query.filter_by(id=id, user_id=user_id).first()
#     if not food:
#         return jsonify({'error': 'Food not found or unauthorized'}), 404

#     db.session.delete(food)
#     db.session.commit()
#     return jsonify({'message': 'Food deleted successfully!'})

# # Additional Routes for Likes, Comments, and Ratings
# @app.route('/foods/<int:id>/like', methods=['POST'])
# def like_food(id):
#     user_id = session.get("user_id")
#     if not user_id:
#         return jsonify({'error': 'Unauthorized'}), 401
#     food = Food.query.get(id)
#     if not food:
#         return jsonify({'error': 'Food not found'}), 404
    
#     like = Like(user_id=user_id, food_id=id)
#     db.session.add(like)
#     db.session.commit()
#     return jsonify({'message': 'Food liked successfully!'})

# @app.route('/foods/<int:id>/comment', methods=['POST'])
# def comment_food(id):
#     user_id = session.get("user_id")
#     if not user_id:
#         return jsonify({'error': 'Unauthorized'}), 401
#     data = request.json
#     comment = Comment(user_id=user_id, food_id=id, text=data['text'])
#     db.session.add(comment)
#     db.session.commit()
#     return jsonify({'message': 'Comment added successfully!'})

# @app.route('/foods/<int:id>/rate', methods=['POST'])
# def rate_food(id):
#     user_id = session.get("user_id")
#     if not user_id:
#         return jsonify({'error': 'Unauthorized'}), 401
#     data = request.json
#     rating = Rating(user_id=user_id, food_id=id, rating=data['rating'])
#     db.session.add(rating)
#     db.session.commit()
#     return jsonify({'message': 'Rating added successfully!'})











# if __name__ == '__main__':
#     app.run(debug=True)




from flask import Flask, request, jsonify, session, send_from_directory
from flask_cors import CORS
from models import User as UserModel, db, Food, Like, Comment, Rating  # Renaming 'user' to 'UserModel' to avoid conflicts
import redis
from flask_bcrypt import Bcrypt
from flask_session import Session
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

# Flask app configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'thisissecret'
app.config['SQLALCHEMY_ECHO'] = True
app.config['UPLOAD_FOLDER'] = 'uploads'
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

def get_logged_in_user():
    """ Helper function to get the logged-in user based on the session """
    user_id = session.get("user_id")
    if not user_id:
        return None
    return UserModel.query.get(user_id)

@app.route("/@me", methods=["GET"])
def get_current_user():
    """ Route to fetch the current logged-in user """
    user = get_logged_in_user()
    if not user:
        return jsonify({'error': 'user unauthorized'}), 401
    return jsonify({
        "name": user.name,
        "email": user.email
    })

@app.route('/register', methods=['POST'])
def add_user():
    """ Route to register a new user """
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
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
    """ Route for user login """
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
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

@app.route('/logout', methods=['POST'])
def logout_user():
    """ Route for user logout """
    session.pop('user_id', None)
    return jsonify({'message': 'User logged out'})

@app.route('/foods', methods=['GET', 'POST'])
def foods():
    """ Route to get all foods or add a new food """
    if request.method == 'GET':
        foods = Food.query.all()
        return jsonify([{
            "id": food.id,
            "image_url": food.image_url,
            "food_name": food.food_name,
            "food_type": food.food_type,
            "food_country": food.food_country,
            "ingredients": food.ingredients,
            "preparation_steps": food.preparation_steps,
            "cooking_time": food.cooking_time,
            "cooking_method": food.cooking_method,
            "rating": food.rating
        } for food in foods])

    if request.method == 'POST':
        user = get_logged_in_user()
        if not user:
            return jsonify({'error': 'User unauthorized'}), 401

        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400

        image = request.files['image']
        image_filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], image_filename))

        data = request.form
        new_food = Food(
            image_url=image_filename,
            food_name=data['food_name'],
            food_type=data['food_type'],
            food_country=data['food_country'],
            ingredients=data['ingredients'],
            preparation_steps=data['preparation_steps'],
            cooking_time=data['cooking_time'],
            cooking_method=data['cooking_method'],
            rating=int(data.get('rating', 0)),
            user_id=user.id
        )
        db.session.add(new_food)
        db.session.commit()

        return jsonify({
            "id": new_food.id,
            "image_url": new_food.image_url,
            "food_name": new_food.food_name,
            "food_type": new_food.food_type,
            "food_country": new_food.food_country,
            "ingredients": new_food.ingredients,
            "preparation_steps": new_food.preparation_steps,
            "cooking_time": new_food.cooking_time,
            "cooking_method": new_food.cooking_method,
            "rating": new_food.rating
        }), 201

@app.route('/uploads/<filename>')
def get_image(filename):
    """ Route to fetch uploaded images """
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/foods/<int:id>', methods=['PUT'])
def update_food(id):
    """ Route to update a food item """
    user = get_logged_in_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    food = Food.query.filter_by(id=id, user_id=user.id).first()
    if not food:
        return jsonify({'error': 'Food not found or unauthorized'}), 404

    data = request.json
    food.food_name = data['food_name']
    food.food_type = data['food_type']
    food.food_country = data['food_country']
    food.ingredients = data['ingredients']
    food.preparation_steps = data['preparation_steps']
    food.cooking_time = data['cooking_time']
    food.cooking_method = data['cooking_method']
    food.rating = data['rating']
    db.session.commit()

    return jsonify({'message': 'Food updated successfully!'})

@app.route('/foods/<int:id>', methods=['DELETE'])
def delete_food(id):
    """ Route to delete a food item """
    user = get_logged_in_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    food = Food.query.filter_by(id=id, user_id=user.id).first()
    if not food:
        return jsonify({'error': 'Food not found or unauthorized'}), 404

    db.session.delete(food)
    db.session.commit()
    return jsonify({'message': 'Food deleted successfully!'})

# Additional Routes for Likes, Comments, and Ratings
@app.route('/foods/<int:id>/like', methods=['POST'])
def like_food(id):
    """ Route for liking a food item """
    user = get_logged_in_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    food = Food.query.get(id)
    if not food:
        return jsonify({'error': 'Food not found'}), 404
    
    like = Like(user_id=user.id, food_id=id)
    db.session.add(like)
    db.session.commit()
    return jsonify({'message': 'Food liked successfully!'})

@app.route('/foods/<int:id>/comment', methods=['POST'])
def comment_food(id):
    """ Route for commenting on a food item """
    user = get_logged_in_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    data = request.json
    comment = Comment(user_id=user.id, food_id=id, text=data['text'])
    db.session.add(comment)
    db.session.commit()
    return jsonify({'message': 'Comment added successfully!'})

@app.route('/foods/<int:id>/rate', methods=['POST'])
def rate_food(id):
    """ Route for rating a food item """
    user = get_logged_in_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    data = request.json
    rating = Rating(user_id=user.id, food_id=id, rating=data['rating'])
    db.session.add(rating)
    db.session.commit()
    return jsonify({'message': 'Rating added successfully!'})

if __name__ == '__main__':
    app.run(debug=True)
