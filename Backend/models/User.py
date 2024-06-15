from firebase_admin.auth import UserRecord


class User:
    _user: UserRecord
    _name: str
    _completedTests = []
    _forumPoints: int = 0
    _testsPoints: int = 0
    _isPremium: bool = False
