from flask import Flask, request, session
from flask_restful import Resource
from flask_migrate import Migrate
from flask_cors import CORS
from flask import Flask, request, make_response

from config import app, db, api

from models import *


# Login and Signup pages - revisit after researching a bit more
app.secret_key = b'5\xe9t\x01\x12A\n\xe4\xb0\x9b\x05\xde\xd4\xc5\x888'

class Signup(Resource):
    def post(self):
        req = request.get_json()
        password = req.get("password")

        try:
            new_user = User(
                username=req.get("username"),
            )

            new_user.password_hash = password

            db.session.add(new_user)
            db.session.commit()
            session["user_id"] = new_user.id

            return (
                new_user.to_dict(
                    only=(
                        "id",
                        "username",
                    )
                ),
                200,
            )
        except ValueError:
            return {
                "message": "* Username must be minimum of 6 characters. Password must be minimum of 8 characters"
            }, 422

api.add_resource( Signup, '/signup')

class Login ( Resource ) :
    def post ( self ) :
        username = request.get_json()[ 'username' ]
        password = request.get_json()[ 'password' ]

        user = User.query.filter( User.username.like( f'{ username }' ) ).one_or_none()

        if user and user.authenticate( password ) :
            session[ 'user_id' ] = user.id
            # print( session[ 'user_id' ] )
            return user.to_dict(), 200
        else :
            return { 'errors':['Invalid username or password.'] }, 401

api.add_resource( Login, '/login')

class CheckSession ( Resource ) :
    def get ( self ) :
        if session.get('user_id') :
            user = User.find_by_id( session.get("user_id"))
            if user :
                return user.to_dict(), 200
            else :
                return { 'errors': ['User not found.'] }, 404
        else :
            return {}, 204

api.add_resource( CheckSession, "/check-session")

class Logout ( Resource ) :
    def delete ( self ) :
        session[ 'user_id' ] = None
        return {}, 204
    
api.add_resource( Logout, '/logout' )

# Presets for tasks to go in

class Tasks(Resource):
    def get(self):
        task = [t.to_dict() for t in Task.query.all()]
        return make_response(task, 200)
    
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
            return make_response(task.to_dict(only =("title", "about", "time_requirement",)), 201)
        except:
            return make_response({"error": "error message here"}, 422)

api.add_resource(Tasks, "/tasks")

# class MyTasks(Resource):
#     def get(self, user_id):
#         tasks_list = []
#         for task in TaskAssignment().query.filter(TaskAssignment.user_id == user_id) :
#             tasks_list.append(task.to_dict())
# 
#     #     tasks = [t for t in TaskAssignment.query.filter(TaskAssignment.user_id == user_id)]
#     #     task = [t["task_container"] for t in tasks]
#     #     just_task = []
#     #     for t in task:
#     #         just_task.append(t)


#         return make_response(tasks_list, 200)
    
# api.add_resource(MyTasks, "/mytasks/<int:user_id>")

class MyTasks(Resource):
    def get(self):
        user_id = session.get("user_id")
        tasks_list = TaskAssignment.query.filter(TaskAssignment.user_id == user_id).all()
        print(tasks_list)
        myTasks =[]
        for assignment in tasks_list:
            myTasks += assignment.task_container.tasks
        print(myTasks)
        tasks = [t.to_dict(only = ("title", "task_container_id", "about")) for t in myTasks]
        print(tasks)
        # for task in tasks_list :
        #     tasks_list.append(task.to_dict(only = ("task_container", "complete")))
        return(tasks, 200)


api.add_resource(MyTasks, "/mytasks")

class TaskById(Resource):
    def get(self, id):
        task = Task.query.filter(Task.id == id).one_or_none()
        if task == None:
            return make_response({"error": "Task not found"}, 404) 
        task_to_dict = task.to_dict()
        return make_response(task_to_dict, 200)

    def patch(self, id):
        task = Task.query.filter(Task.id == id).one_or_none()
        if task == None:
            return make_response({"error": "Task not found"}, 404)
        datas = request.get_json()
        try:
            for data in datas:
                setattr (task, data, datas[data])
            db.session.add(task)
            db.session.commit()
        except:
            return make_response({"errors": ["validation errors"]}, 400)
        
    def delete(self, id):
        task = Task.query.filter(Task.id == id).one_or_none()
        if task == None:
            return make_response({"error": "Task not found"}, 404) 
        db.session.delete(task)
        db.session.commit()
        return make_response({}, 204)

api.add_resource(TaskById, "/task/<int:id>")

class TaskContainers(Resource):
    def get(self):
        task_lists = [t.to_dict() for t in TaskContainer.query.all()]
        return make_response(task_lists, 200)
    
    def post(self):
        data = request.get_json()
        try:
            # this will need to be defined further
            task_preset = TaskContainer(
                user_id = data.get("user_id"),
                task_container_id = data.get("task_container_id"),
                complete = data.get("complete")
            )
            db.session.add(task_preset)
            db.session.commit()
            return make_response(task.to_dict(only =("user_id", "task_container_id", "complete",)), 201)
        except:
            return make_response({"error": "error message here"}, 422)

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
    def patch(self, id):
        task_container = TaskContainer.query.filter(TaskContainer.id == id).one_or_none()
        if task_container == None:
            return make_response({"error": "Task_container not found"}, 404)
        datas = request.get_json()
        try:
            for data in datas:
                setattr (task_container, data, datas[data])
            db.session.add(task_container)
            db.session.commit()
        except:
            return make_response({"errors": ["validation errors"]}, 400)

api.add_resource(TaskContainerById, "/preset/<int:id>")


# class MyTaskContainers(Resource):
#     def get(self):
#         my_task_list = [t.to_dict() for t in TaskAssignment.query.filter(TaskAssignment.user_id == user_id)]
#         return make_response(my_task_list)

# api.add_resource(MyTaskContainers, "/mypresets")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

