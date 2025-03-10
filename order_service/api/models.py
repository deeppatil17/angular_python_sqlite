from django.db import models

class Order(models.Model):
    product=models.CharField(max_length=100)
    quantity=models.IntegerField()
    price=models.IntegerField()
    
    def __str__(self):
        return self.product
