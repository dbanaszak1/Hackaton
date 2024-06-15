from fireo import models
from fireo.models import Model


class User(Model):
    _id: models.TextField()
    _name: models.TextField()
    _completedTests = models.ListField()
    _forumPoints = models.NumberField(0)
    _testPoints = models.NumberField(0)
    _isPremium = models.BooleanField(False)

    class Meta:
        collection_name = 'user'


def user_to_dict(self):
    return {
        'id': self.id,
        'name': self.name,
        'completedTests': self._completedTests,
        'testPoints': self._testPoints,
        'forumPoints': self._forumPoints,
        'isPremium': self._isPremium
    }
