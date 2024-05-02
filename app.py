from fastapi import FastAPI
from flask import Flask, request, jsonify
from flask_cors import CORS
from bson.objectid import ObjectId
import datetime
import jwt
from bson.json_util import dumps
from dotenv import load_dotenv
import os
from peewee import SqliteDatabase
from peewee import Model, CharField, IntegerField
app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = "ouioui"
db = SqliteDatabase('test.db')

class User(Model):
    name = CharField()
    email = CharField()
    password = CharField()
    class Meta:
        database = db

db.connect()
db.create_tables([User])

@app.route('/', methods=['GET'])
def get_items():
    users = User.select()
    user_list = [{'id': user.id, 'name': user.name, 'email': user.email, 'password': user.password} for user in users]
    return jsonify(user_list)

@app.route('/:<item_id>', methods=['GET'])
def get_item(item_id):
    user = User.get_or_none(id=item_id)
    if user:
        user_data = {'id': user.id, 'name': user.name, 'email': user.email, 'password': user.password}
        return jsonify(user_data), 200
    else:
        return jsonify({'error': 'Utilisateur non trouvé'}), 404

@app.route('/register', methods=['POST'])
def add_item():
    data = request.json
    if not data:
        return jsonify({'ok': False, 'message': 'Mauvaise requête, paramètres manquants ou invalides.'}), 400
    existing_user = User.get_or_none(email=data.get('email'))
    if existing_user:
        return jsonify({'ok': False, 'message': 'Cet utilisateur existe déjà'}), 400
    new_user = {
        'name': data.get('name'),
        'email': data.get('email'),
        'password': data.get('password')
    }
    insert_user = User.create(name=data['name'], email=data['email'], password=data['password'])
    user_id = str(insert_user.inserted_id)
    token_payload = {
        'id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    token = jwt.encode(token_payload, app.config['SECRET_KEY'], algorithm='HS256')
    response_data = {
        'ok': True,
        'data': {
            'token': 'Bearer ' + token,
            'user': {
                'email': new_user['email'],
                'name': new_user['name'],
                'password': new_user['password']
            }
        }
    }
    return jsonify(response_data), 201

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    if not data:
        return jsonify({'ok': False, 'message': 'Mauvaise requête, paramètres manquants ou invalides.'}), 400
    resultats = User.get_or_none(id=data['_id'])
    if resultats:
        user = {
            'id': resultats[0]["_id"],
            'email': resultats[0]['email'],
            'firstName': resultats[0]['firstName'],
            'lastName': resultats[0]['lastName']
        }
        user_id = str(user['id'])
        token_payload = {
            'id': user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        token = jwt.encode(token_payload, app.config['SECRET_KEY'], algorithm='HS256')
        response_data = {
            'ok': True,
            'data': {
                'token': 'Bearer ' + token,
                'user': {
                    'email': user['email'],
                    'firstName': user['firstName'],
                    'lastName': user['lastName']
                }
            }
        }
        return jsonify(response_data), 200
    else:
        return jsonify({'error': 'L\'utilisateur n\'existe pas'}), 401

def decode_token(token):
    try:
        parts = token.split()
        token = parts[2]
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return payload
    except jwt.InvalidTokenError:
        return None

@app.route('/user/me', methods=['GET'])
def find_user():
    if 'Authorization' not in request.headers:
        return jsonify({'error': 'Authorization manquant'}), 401
    token = request.headers['Authorization']
    if not token:
        return jsonify({'ok': False, 'message': 'Token JWT manquant'}), 401
    user_info = decode_token(token)
    if not user_info:
        return jsonify({'ok': False, 'message': 'Token JWT invalide ou expiré'}), 401
    object_id = ObjectId(user_info['id'])
    user_document = User.get_or_none(object_id)
    if user_document:
        response_data = {
            'ok': True,
            'data': {
                'user': {
                    'email': user_document['email'],
                    'firstName': user_document['firstName'],
                    'lastName': user_document['lastName']
                }
            }
        }
        return jsonify(response_data), 200
    else :
        return jsonify({'ok': False, 'message': 'Utilisateur n\'existe pas'}), 401

@app.route('/user/edit', methods=['PUT'])
def edit_profile():
    data = request.json
    if not data:
        return jsonify({'ok': False, 'message': 'Mauvaise requête, paramètres manquants ou invalides.'}), 400
    if 'Authorization' not in request.headers:
        return jsonify({'error': 'Authorization manquant'}), 401
    token = request.headers['Authorization']
    if not token:
        return jsonify({'ok': False, 'message': 'Token JWT manquant'}), 401
    user_info = decode_token(token)
    if not user_info:
        return jsonify({'ok': False, 'message': 'Token JWT invalide ou expiré'}), 401
    object_id = ObjectId(user_info['id'])
    user_document = User.get_or_none(id=data['_id'])
    if user_document:
        user_document.password = data['password']
        response_data = {
            'ok': True,
            'data': {
                'user': {
                    'email': user_document.email,
                    'firstName': user_document.password
                }
            }
        }
        return jsonify(response_data), 200
    else :
        return jsonify({'ok': False, 'message': 'Utilisateur n\'existe pas'}), 401

@app.route('/user/remove', methods=['DELETE'])
def delete_profile():
    if 'Authorization' not in request.headers:
        return jsonify({'error': 'Authorization manquant'}), 401
    token = request.headers['Authorization']
    if not token:
        return jsonify({'ok': False, 'message': 'Token JWT manquant'}), 401
    user_info = decode_token(token)
    if not user_info:
        return jsonify({'ok': False, 'message': 'Token JWT invalide ou expiré'}), 401
    object_id = ObjectId(user_info['id'])
    user_document = User.get_or_none(object_id)
    if user_document:
        response_data = {
            'ok': True,
            'data': {
                'user': {
                    'email': user_document['email'],
                    'firstName': user_document['firstName'],
                    'lastName': user_document['lastName'],
                    'removed': True
                }
            }
        }
        user_document.delete_instance()
        return jsonify(response_data), 200

if __name__ == '__main__':
    app.run(port=8000, debug=True)
