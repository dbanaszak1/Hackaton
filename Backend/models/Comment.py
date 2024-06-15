import uuid

from Backend.models.User import User


class Comment:
    _id: uuid
    _content: str
    creator: User
