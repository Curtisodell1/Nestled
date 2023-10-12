from flask import Flask, request, session
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from flask import Flask, request, make_response

from config import app, db, api

from models import *

# Login and Signup pages - revisit after researching a bit more
class Login(Resource):
    def post(self):
        pass

    def delete(self):
        pass

api.add_resource(Login, "/login", endpoint = 'login')

class Signup(Resource):
    def post(self):
        pass

    def delete(self):
        pass

api.add_resource(Signup, "/signup", endpoint = 'signup')

# Presets for tasks to go in

class Tasks(Resource):
    def get(self, task_container_id):
        task = [t.to_dict() for t in Task.query.filter(Task.task_container_id == task_container_id)]
        return make_response(task, 200)
    
    def delete(self, task_container_id):
        task = [t.to_dict() for t in Task.query.filter(Task.task_container_id == task_container_id)]
        if task is None:
            return make_response({"error":"task not found"}, 404)
        
        db.session.delete(task)
        db.session.commit()
        return make_response({}, 204)
    
    def post(self):
        data = request.get_json()
        try:
            # this will need to be defined further
            task = Task(
                title = data.get("title"),
                about = data.get("about"),
                time_requirement = data.get("time_requirement")
            )
            db.session.add(task)
            db.session.commit()
            print(task.to_dict())
            return make_response(task.to_dict(), 201)
        except:
            return make_response({"error": "error message here"}, 400)

api.add_resource(Tasks, "/tasks")

class TaskContainers(Resource):
    def get(self):
        task_lists = [t.to_dict() for t in TaskContainer.query.all()]
        return make_response(task_lists, 200)

api.add_resource(TaskContainers, "/presets")

class TaskContainerById(Resource):
    def get(self, id):
        task_list = TaskContainer.query.filter(TaskContainer.id == id).one_or_none()
        task_list_to_dict = task_list.to_dict()
        return make_response(task_list_to_dict, 200)

    def delete(self, id):
        task_list = TaskContainer.query.filter(TaskContainer.id == id).one_or_none()
        if task_list is None:
            return make_response({"error": "Task list not found."}, 404)
        else:
            db.session.delete(task_list)
            db.session.commit()
        return make_response({}, 204)

api.add_resource(TaskContainerById, "/preset/<int:id>")


class MyTaskContainers(Resource):
    def get(self, user_id):
        my_task_list = [t.to_dict() for t in TaskAssignment.query.filter(TaskAssignment.user_id == user_id)]
        return make_response(my_task_list)

api.add_resource(MyTaskContainers, "/mypresets")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

