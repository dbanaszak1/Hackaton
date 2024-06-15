from firebase_admin import credentials, firestore, initialize_app, auth
from firebase_admin.auth import UserNotFoundError
from flask import Flask, jsonify, request
from flask_cors import CORS

from misc import serialize_document, serialize_document_reference

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")
cred = credentials.Certificate('firebase-key.json')
default_app = initialize_app(cred)
db = firestore.client()

user_ref = db.collection('user')
post_ref = db.collection('post')
test_ref = db.collection('test')


# test_ref = db.collection('test')


@app.route('/auth/login', methods=['POST'])
def get_user_by_mail():
    try:
        mail = request.json['email']
        user = auth.get_user_by_email(mail)
        return jsonify({"success": "User found", "user": user.email}), 200
    except UserNotFoundError:
        return jsonify({"error": "User does not exist"}), 404


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')  # Zmień na swoją lokalną aplikację frontendową
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')  # Włączenie obsługi ciasteczek

    return response


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


@app.route('/post/id/<string:id>', methods=['GET'])
def get_post_by_id(id: str):
    post = post_ref.document(id).get()
    return jsonify({"success": "Post found", "post": serialize_document(post)})


@app.route('/post/<int:n>', methods=['GET'])
def get_n_post(n: int):
    posts = []
    fetched_posts = post_ref.stream()
    for post in fetched_posts:
        posts.append(serialize_document(post))
    if len(posts) < n:
        return jsonify({"error": "Post not found"}), 404
    return jsonify({"success": "Posts found", "posts": posts[n]}), 200


@app.route('/post/<string:id>/comments', methods=["GET"])
def get_post_comments(id: str):
    post = post_ref.document(id)
    current_comments = post.get().to_dict()['comments']
    return jsonify({
        "success": "All comments", "comments": current_comments
    })


@app.route('/post/<string:id>/add_comment', methods=["POST"])
def add_comment(id: str):
    post = post_ref.document(id)
    current_comments = post.get().to_dict()['comments']

    content = request.form.get('content')
    creator = request.form.get('creator')

    creator_ref = db.document(f'user/{creator}').get()

    comment = {
        'comment': content,
        'creator': serialize_document(creator_ref)
    }

    current_comments.append(comment)

    post.update({
        "comments": current_comments
    })

    return jsonify({"success": "Comment added", "comment": comment})


@app.route('/post', methods=['POST'])
def post_posts():
    title = request.form.get('title')
    content = request.form.get('content')
    category = request.form.get('category')
    subcategory = request.form.get('subcategory')
    creator = request.form.get('creator')
    comments = []
    status = request.form.get('status')

    creator_ref = db.document(f'user/{creator}').get()

    response = {
        'title': title,
        'content': content,
        'category': category,
        'creator': serialize_document_reference(creator_ref),
        'comments': comments,
        'status': status,
        'subcategory': subcategory
    }

    new_post = post_ref.add(response)
    response['id'] = new_post[1].id
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
    current_tasks = test.get().to_dict()['tasks']
    data = request.get_json()
    task = {"question": data['question'], "answers": data["answers"]}
    current_tasks.append(task)
    test.update({
        "tasks": current_tasks
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
