from django.urls import path

from . import views

urlpatterns = [
    path('', views.task_handler, name='tasks'),
    path('<int:task_id>/', views.task_handler, name='task_detail'),
]