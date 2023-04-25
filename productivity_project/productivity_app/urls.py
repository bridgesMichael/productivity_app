from django.urls import path

from . import views

urlpatterns = [
    path('', views.task_handler, name='tasks')
]