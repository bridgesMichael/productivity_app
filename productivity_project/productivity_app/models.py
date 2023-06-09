from django.db import models
from user_app.models import App_User


    
class Task(models.Model):
    user = models.ForeignKey(App_User, on_delete=models.CASCADE)
    parent_task = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)
    category = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    due_date = models.DateTimeField()
    description = models.TextField(null=True, blank=True)
    amount_of_time_worked = models.IntegerField(default=0)
    status = models.CharField(max_length=25, default='')
    completed_on_time = models.BooleanField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
  
    
    def __str__(self):
        return f"{self.title} | {self.due_date}"