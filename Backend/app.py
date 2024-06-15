from firebase_admin import credentials, firestore, initialize_app, auth
from firebase_admin.auth import UserNotFoundError
from flask import Flask, jsonify, request

from misc import serialize_document, serialize_document_reference

app = Flask(__name__)
cred = credentials.Certificate('firebase-key.json')
default_app = initialize_app(cred)
db = firestore.client()

user_ref = db.collection('user')
post_ref = db.collection('post')
test_ref = db.collection('test')


# test_ref = db.collection('test')


@app.route('/auth/email/<string:userMail>', methods=['GET'])
def get_user_by_mail(userMail: str):
    try:
        user = auth.get_user_by_email(userMail)
        return jsonify({"success": "User found", "user": user.email}), 200
    except UserNotFoundError:
        return jsonify({"error": "User does not exist"}), 404


@app.route('/user/<string:id>', methods=['GET'])
def get_user_by_uuid(id: str):
    user_doc = user_ref.document(id).get()
    if user_doc.exists:
        serialized_user = serialize_document(user_doc)
        return jsonify({"success": "User found", "user": serialized_user}), 200
    else:
        return jsonify({"error": "User does not exist"}), 404


@app.route('/user/points/test', methods=['GET'])
def get_user_leaderboard_by_test_points():
    users = user_ref.stream()  # Assuming User collection is `user_ref`
    points = {}
    for user in users:
        user_data = user.to_dict()
        points[user.id] = user_data.get('testPoints', 0)
    return jsonify({"success": "Users leaderboard found", "leaderboard": points}), 200


@app.route('/user/points/forum', methods=['GET'])
def get_user_leaderboard_by_forum_points():
    users = user_ref.stream()  # Assuming User collection is `user_ref`
    points = {}
    for user in users:
        user_data = user.to_dict()
        points[user.id] = user_data.get('forumPoints', 0)
    return jsonify({"success": "Users leaderboard found", "leaderboard": points}), 200


@app.route('/post', methods=['GET'])
def get_posts():
    posts = []
    fetched_posts = post_ref.stream()
    for post in fetched_posts:
        posts.append(serialize_document(post))
    return jsonify({"success": "Posts found", "posts": posts}), 200


@app.route('/post', methods=['POST'])
def post_posts():
    title = request.form.get('title')
    content = request.form.get('content')
    category = request.form.get('category')
    creator = request.form.get('creator')
    comments = request.form.get('comments')
    status = request.form.get('status')
    subcategory = request.form.get('subcategory')

    creator_ref = db.document(f'user/{creator}')

    response = {
        'title': title,
        'content': content,
        'category': category,
        'creator': serialize_document_reference(creator_ref),
        'comments': comments,
        'status': status,
        'subcategory': subcategory
    }
    return jsonify({"success": "Post created", "post": response})


@app.route('/test', methods=['GET'])
def get_all_tests():
    tests = []
    fetched_tests = test_ref.stream()
    for test in fetched_tests:
        tests.append(serialize_document(test))
    return jsonify({"success": "Tests found", "tests": tests}), 200


@app.route('/test/<string:id>', methods=['GET'])
def get_test_by_id(id: str):
    test_doc = test_ref.document(id).get()
    if test_doc.exists:
        return jsonify({"success": "Test found", "test": serialize_document(test_doc)}), 200
    else:
        return jsonify({"error": "Test does not exist"}), 404


if __name__ == '__main__':
    app.run(threaded=True)
