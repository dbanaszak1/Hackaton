from fireo import models
from fireo.models import Model


class Test(Model):
    _name: models.TextField()
    _category: models.TextField()
    _subCategory: models.TextField()
    _level: models.TextField()
    _tasks: models.ListField()
    _creationDate: models.DateTime()
