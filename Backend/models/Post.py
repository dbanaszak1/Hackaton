from fireo import models
from fireo.models import Model

from Backend.models import User, Comment


class Post(Model):
    _title: models.TextField()
    _category: models.TextField()
    _creator: models.ReferenceField(User)
    _comments: models.ListField(Comment)
    _status: models.TextField()
    _subcategory: models.TextField()
    _creationDate: models.DateTime()

    class Meta:
        collection_name = 'post'
