from fireo import models
from fireo.models import Model


class User(Model):
    _userId: models.TextField()
    _name: models.TextField()
    _completedTests = models.ListField()
    _forumPoints: models.NumberField() = 0
    _testPoints: models.NumberField() = 0
    _isPremium: models.BooleanField() = False

    class Meta:
        collection_name = 'user'
