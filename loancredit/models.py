from django.db import models

class Subscribe(models.Model):
    name = models.CharField(max_length = 150, db_index = True)
    email = models.EmailField(max_length = 150, blank = True, db_index = True)

    def __str__(self):
        return '{}'.format(self.title)
