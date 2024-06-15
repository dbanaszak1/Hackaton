import uuid

from Backend.models.Comment import Comment
from Backend.models.User import User


class Post:
    _id: uuid
    _title: str
    _category: str
    _creator: User
    _comments: [Comment]
    _status: str
    _subcategory: str

