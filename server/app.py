from flask import Flask, request, session
from flask_restful import Resource
from flask_migrate import Migrate
from flask_cors import CORS
from flask import Flask, request, make_response

from config import app, db, api

from models import *


# Login and Signup pages - revisit after researching a bit more
app.secret_key = b'5\xe9t\x01\x12A\n\xe4\xb0\x9b\x05\xde\xd4\xc5\x888'

# 1.✅ Create a Signup route
class Signup ( Resource ) :
    #1.2 The signup route should have a post method
    def post ( self ) :
        #1.2.1 Get the values from the request body with get_json
        rq = request.get_json()
        User.clear_validation_errors()
        try :
            #1.2.2 Create a new user, however only pass email/username ( and any other values we may have )
            new_user = User(
                username = rq[ 'username' ],
                #1.2.3 Call the password_hash method on the new user and set it to the password from the request
                password_hash = rq[ 'password' ]
            )
            if new_user.validation_errors :
                raise ValueError
            
            #1.2.4 Add and commit
            db.session.add( new_user )
            db.session.commit()

            #1.2.5 Add the user id to session under the key of user_id
            session[ 'user_id' ] = new_user.id

            #1.2.6 send the new user back to the client with a status of 201
            return new_user.to_dict(), 201
        except :
            errors = new_user.validation_errors
            new_user.clear_validation_errors()
            return { 'errors': errors }, 422
    #1.3 Test out your route with the client or Postman

    #1.1 Use add_resource to add a new endpoint '/signup' 
api.add_resource( Signup, '/signup')

# 2.✅ Test this route in the client/src/components/Authentication.sj 

# 3.✅ Create a Login route
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


class MyTaskContainers(Resource):
    def get(self, user_id):
        my_task_list = [t.to_dict() for t in TaskAssignment.query.filter(TaskAssignment.user_id == user_id)]
        return make_response(my_task_list)

api.add_resource(MyTaskContainers, "/mypresets")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

