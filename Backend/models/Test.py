from fireo import models
from fireo.models import Model


class Test(Model):
    _id: models.TextField
    _name: models.TextField()
    _category = models.TextField()
    _subCategory = models.TextField()
    _level = models.TextField()
    _tasks = models.ListField()
    _creationDate = models.DateTime()

    class Meta:
        collection_name = 'test'


def test_to_dict(self):
    return {
        'id': self.id,
        'name': self.name,
        'category': self._category,
        'subCategory': self._subCategory,
        'level': self._level,
        'tasks': self._tasks,
        'creationDate': self._creationDate
    }
