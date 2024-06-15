import fireo
from firebase_admin import credentials, firestore, initialize_app, auth
from firebase_admin.auth import UserNotFoundError
from flask import Flask, jsonify, request

from Backend.models.Test import Test, test_to_dict
from models.Post import Post, post_to_dict
from models.User import User, user_to_dict

app = Flask(__name__)
cred = credentials.Certificate('firebase-key.json')
default_app = initialize_app(cred)
db = firestore.client()
fireo.connection(from_file="./firebase-key.json")


# user_ref = db.collection('user')
# test_ref = db.collection('test')


@app.route('/auth/email/<string:userMail>', methods=['GET'])
def get_user_by_mail(userMail: str):
    with app.app_context():
        try:
            user = auth.get_user_by_email(userMail)
            print(type(user))
            return jsonify({"success": "User found", "user": user.email})
        except UserNotFoundError:
            return jsonify({"error": "User does not exist"}), 404


@app.route('/user/<string:id>', methods=['GET'])
def get_user_by_uuid(id: str):
    user = User.collection.filter("id", "==", id).get()
    if user:
        return jsonify({"success": "User found", "user": user_to_dict(user)})
    else:
        return jsonify({"error": "User does not exist"}), 404


@app.route('/user/points/test', methods=['GET'])
def get_user_leaderboard_by_test_points():
    users = User.collection.fetch()
    points = {}
    for user in users:
        points.update({user.id: user.testPoints})
    return jsonify({"success": "Users leaderboard found", "leaderboard": points})


@app.route('/user/points/forum', methods=['GET'])
def get_user_leaderboard_by_forum_points():
    users = User.collection.fetch()
    points = {}
    for user in users:
        points.update({user.id: user.forumPoints})
    return jsonify({"success": "Users leaderboard found", "leaderboard": points})


@app.route('/post', methods=['GET'])
def get_posts():
    posts = []
    fetched_posts = Post.collection.fetch()
    for post in fetched_posts:
        posts.append(post_to_dict(post))
    return jsonify({"success": "Posts found", "posts": posts})


@app.route('/post', methods=['POST'])
def post_posts():
    title = request.form.get('title')
    content = request.form.get('content')
    category = request.form.get('category')
    creator = request.form.get('creator')
    comments = request.form.get('comments')
    status = request.form.get('status')
    subcategory = request.form.get('subcategory')
    response = {
        'title': title,
        'content': content,
        'category': category,
        'creator': creator,
        'comments': comments,
        'status': status,
        'subcategory': subcategory
    }
    return jsonify({"success": "Posts found", "posts": response})


@app.route('/test', methods=['GET'])
def get_all_tests():
    tests = []
    fetched_tests = Test.collection.fetch()
    for test in fetched_tests:
        tests.append(test_to_dict(test))
    return jsonify({"success": "Tests found", "tests": tests})


@app.route('/test/<string:id>', methods=['GET'])
def get_test_by_id(id: str):
    test = Test.collection.filter("id", "==", id).get()
    return jsonify({"success": "Posts found", "posts": test_to_dict(test)})


if __name__ == '__main__':
    app.run(threaded=True)
