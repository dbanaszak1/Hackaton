from firebase_admin import credentials, firestore, initialize_app, auth
from firebase_admin.auth import UserNotFoundError
from flask import Flask, jsonify, request

from Backend.misc import serialize_document, serialize_document_reference

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
    users = user_ref.stream()
    points = {}
    for user in users:
        user_data = user.to_dict()
        points[user.id] = user_data.get('testPoints', 0)
    return jsonify({"success": "Users leaderboard found", "leaderboard": points}), 200


@app.route('/user/points/forum', methods=['GET'])
def get_user_leaderboard_by_forum_points():
    users = user_ref.stream()
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


@app.route('/post/<int:n>', methods=['GET'])
def get_n_post(n: int):
    posts = []
    fetched_posts = post_ref.stream()
    for post in fetched_posts:
        posts.append(serialize_document(post))
    if len(posts) < n:
        return jsonify({"error": "Post not found"}), 404
    return jsonify({"success": "Posts found", "posts": posts[n]}), 200


@app.route('/post', methods=['POST'])
def post_posts():
    title = request.form.get('title')
    content = request.form.get('content')
    category = request.form.get('category')
    subcategory = request.form.get('subcategory')
    creator = request.form.get('creator')
    comments = []
    status = request.form.get('status')

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

    post_ref.add(response)
    return jsonify({"success": "Post created", "post": response})


@app.route('/test', methods=['GET'])
def get_all_tests():
    tests = []
    fetched_tests = test_ref.stream()
    for test in fetched_tests:
        tests.append(serialize_document(test))
    return jsonify({"success": "Tests found", "tests": tests}), 200


@app.route('/test', methods=['POST'])
def post_test():
    name = request.form.get('name')
    category = request.form.get('category')
    subcategory = request.form.get('subcategory')
    level = request.form.get('level')
    tasks = []

    response = {
        'name': name,
        'category': category,
        'subcategory': subcategory,
        'level': level,
        'tasks': tasks
    }

    test_ref.add(response)
    return jsonify({"success": "Test created", "post": response})


@app.route('/test/edit/<string:id>', methods=['POST'])
def add_task_to_test(id: str):
    test = test_ref.document(id)
    data = request.get_json()
    tasks = {"question": data['question'], "answers": data["answers"]}
    print(tasks)
    test.update({
        "tasks": tasks
    })

    return jsonify({'success': f'Document {id} updated successfully'}), 200


@app.route('/test/<string:id>', methods=['GET'])
def get_test_by_id(id: str):
    test_doc = test_ref.document(id).get()
    if test_doc.exists:
        return jsonify({"success": "Test found", "test": serialize_document(test_doc)}), 200
    else:
        return jsonify({"error": "Test does not exist"}), 404


if __name__ == '__main__':
    app.run(threaded=True)
