from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class App_User(AbstractUser):
    email = models.EmailField(blank=False, null=False, unique=True)
    name = models.CharField(max_length=255, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']
    
    def __str__(self): 
        return f"{self.name} | {self.email}"
    
class Task(models.Model):
    user = models.ForeignKey(App_User, on_delete=models.CASCADE)
    parent_task = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)
    category = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    due_date = models.DateTimeField()
    description = models.TextField(null=True, blank=True)
    amount_of_time_worked = models.DurationField()
    status = models.CharField(max_length=25)
    completed_on_time = models.BooleanField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} | {self.due_date}"