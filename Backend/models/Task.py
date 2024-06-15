from fireo import models
from fireo.models import Model


class Task(Model):
    _question: models.TextField()
    _answers: models.ListField()
