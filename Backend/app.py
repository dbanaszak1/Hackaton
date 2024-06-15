from firebase_admin import credentials, firestore, initialize_app, auth
from firebase_admin.auth import UserNotFoundError
from flask import Flask, jsonify

app = Flask(__name__)
cred = credentials.Certificate('firebase-key.json')
default_app = initialize_app(cred)
db = firestore.client()


# user_ref = db.collection('user')
# test_ref = db.collection('test')


@app.route('/user/<string:userMail>')
def get_user_by_mail(userMail: str):
    with app.app_context():
        try:
            user = auth.get_user_by_email(userMail)
            print(type(user))
            return jsonify({"success": "User found", "user": user.email})
        except UserNotFoundError:
            return jsonify({"error": "User does not exist"}), 404


if __name__ == '__main__':
    app.run(threaded=True)
