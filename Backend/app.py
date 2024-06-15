import fireo
from firebase_admin import credentials, firestore, initialize_app, auth
from firebase_admin.auth import UserNotFoundError
from flask import Flask, jsonify
from fireo import models
import uuid

from models.Post import Post
from models.User import User

app = Flask(__name__)
cred = credentials.Certificate('firebase-key.json')
default_app = initialize_app(cred)
db = firestore.client()
fireo.connection(from_file="./firebase-key.json")


# user_ref = db.collection('user')
# test_ref = db.collection('test')


@app.route('/auth/email/<string:userMail>')
def get_user_by_mail(userMail: str):
    with app.app_context():
        try:
            user = auth.get_user_by_email(userMail)
            print(type(user))
            return jsonify({"success": "User found", "user": user.email})
        except UserNotFoundError:
            return jsonify({"error": "User does not exist"}), 404


@app.route('/user/<string:id>')
def get_user_by_uuid():
    user = User.collection.filter("id", "==", id).get()
    if user:
        return jsonify({"success": "User found", "user": user})
    else:
        return jsonify({"error": "User does not exist"}), 404


@app.route('/user/points/test')
def get_user_leaderboard_by_test_points():
    users = User.collection.fetch()
    points = {}
    for user in users:
        points.update({user.id: user.testPoints})
    return jsonify({"success": "Users leaderboard found", "leaderboard": points})


@app.route('/user/points/forum')
def get_user_leaderboard_by_forum_points():
    users = User.collection.fetch()
    points = {}
    for user in users:
        points.update({user.id: user.forumPoints})
    return jsonify({"success": "Users leaderboard found", "leaderboard": points})


@app.route('/post')
def get_posts():
    posts = Post.collection.fetch()
    return jsonify({"success": "Posts found", "posts": posts})

# @app.route('/post', methods=['POST'])
# def post_posts():
#    posts = Post.collection.fetch()
#    return jsonify({"success": "Posts found", "posts": posts})


if __name__ == '__main__':
    app.run(threaded=True)
