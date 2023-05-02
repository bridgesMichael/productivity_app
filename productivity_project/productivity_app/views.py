from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.forms.models import model_to_dict
from .models import Task

@api_view(['POST', 'GET', 'DELETE', 'PUT'])
def task_handler(request, task_id=None):
    
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
            print(f"Error is: {e}")
            return JsonResponse({'tasks': tasks})
        
    elif request.method == 'GET':
        if task_id:
            task = get_object_or_404(Task, id=task_id, user=request.user)
            task_dict = model_to_dict(task)
            return JsonResponse({'task': task_dict})
        else:
            try:
                tasks = list(Task.objects.filter(user=request.user).values())
                return JsonResponse({'tasks': tasks})
            except Exception as e:
                print(e)
                return JsonResponse({'tasks': []})
        
    elif request.method == 'DELETE':
        try:
            task = get_object_or_404(Task, id=task_id, user=request.user)
            task.delete()
            return JsonResponse({'success':True})
        except Exception as e:
            print(e)
            return JsonResponse({'success':False})
        
    elif request.method == 'PUT':
        try:
            if task_id:
                task = get_object_or_404(Task, id=task_id, user=request.user)
                data = request.data
                for key, value in data.items():
                    setattr(task, key, value)
                task.save()
                print(task.status)
                return JsonResponse({'task': task})
        except Exception as e:
            print(e)
            return JsonResponse({'success':False})