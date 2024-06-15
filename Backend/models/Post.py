from fireo import models
from fireo.models import Model

from Backend.models.User import User
from Backend.models.Comment import Comment


class Post(Model):
    _id = models.TextField
    _title = models.TextField()
    _category = models.TextField()
    _creator = models.ReferenceField(User)
    _comments = models.ListField(Comment)
    _status = models.TextField()
    _subcategory = models.TextField()
    _creationDate = models.DateTime()

    class Meta:
        collection_name = 'post'


def post_to_dict(self):
    return {
        'id': self._id,
        'title': self._title,
        'category': self._category,
        'creator': self._creator,
        'comments': self._comments,
        'status': self._status,
        'subcategory': self._subcategory,
        'creationDate': self._creationDate
    }
