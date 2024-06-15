import uuid

from Backend.models.User import User
from fireo import models
from fireo.models import Model


class Comment(Model):
    _content: models.TextField()
    _creator: models.ReferenceField(User)
    _creationDate: models.DateTime()
