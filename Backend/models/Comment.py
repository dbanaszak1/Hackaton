from fireo import models
from fireo.models import Model

from Backend.models.User import User


class Comment(Model):
    _content: models.TextField()
    _creator: models.ReferenceField(User)
    _creationDate: models.DateTime()

    class Meta:
        collection_name = 'comment'
