from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Task

@api_view(['POST', 'GET'])
def task_handler(request):
    if request.method == 'POST':
        tasks = list(Task.objects.filter(user=request.user).values())
        try:
            title = request.data['title']
            category = request.data['category']
            due_date = request.data['due_date']
            description = request.data['description']
            
            new_task = Task.objects.create(
                title=title,
                category=category,
                due_date=due_date,
                description=description,
                user=request.user
            )
            
            new_task.save()
            tasks = list(Task.objects.filter(user=request.user).values())
            return JsonResponse({'tasks': tasks})
        except Exception as e:
            print(e)
            return JsonResponse({'tasks': tasks})
    elif request.method == 'GET':
        try:
            tasks = list(Task.objects.filter(user=request.user).values())
            return JsonResponse({'tasks': tasks})
        except Exception as e:
            print(e)
            return JsonResponse({'tasks': []})