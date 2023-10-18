from sqlalchemy_serializer import SerializerMixin
# from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import func
from datetime import datetime

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    username = db.Column( db.String, nullable = False, unique = True )

    # ✅ Add a column _password_hash
    _password_hash = db.Column( db.String, nullable = False )
        # Note: When an underscore is used, it's a sign that the variable or method is for internal use.

    serialize_rules = ( '-_password_hash', )

    #relationship for Task Assignment
    task_assignments = db.relationship("TaskAssignment", backref="user", cascade="all, delete-orphan")

    @classmethod
    def find_by_id ( cls, id ) :
        return User.query.filter( cls.id == id ).first()
    
    validation_errors = []

    @classmethod
    def clear_validation_errors ( cls ) :
        cls.validation_errors = []

    # Password stuff for user model!
    # ✅ Create a hybrid_property that will protect the hash from being viewed
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")

    @password_hash.setter
    def password_hash(self, password):
        if not len(password) >= 8:
            raise ValueError("Password must contain 8 or more characters.")

        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))
    
    @validates( 'username' )
    def validate_username ( self, key, username ) :
        if type( username ) is str and username :
            user = User.query.filter( User.username.like( f'{ username }' ) ).first()
            if user :
                self.validation_errors.append( 'Username already exists.' )
            else :
                return username
        else :
            self.validation_errors.append( 'Username cannot be blank.' )

class Task(db.Model, SerializerMixin):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    about = db.Column(db.String)
    time_requirement = db.Column(db.Integer)

    #Relationship with task container
    task_container_id = db.Column(db.Integer, db.ForeignKey("task_containers.id"))

    #serializer rules
    # serialize_rules = ("-task_container.tasks")

    #Validation
    @validates("title", "about", "time_requirement")
    def validates_tasks(self, key, prop):
        if key == "title":
            if 3 < len(prop) < 20:
                return prop
            else:
                return ValueError("gots ta be a string greater than 3 and less than 20 characters")
        if key == "about":
            if 25 < len(prop) < 250:
                return prop
            else:
                return ValueError("gots ta be a string greater than 25 and less than 250 characters")
        if key == "time_requirement":
            if 5<= prop <= 60:
                return prop
            else:
                return ValueError("time required must be between 5 minutes and 60 minutes")
        else:
            return Exception("oops you did something wrong")

class TaskContainer(db.Model, SerializerMixin):
    __tablename__ = "task_containers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    #backref relationship for task and assign task
    tasks = db.relationship("Task", backref="task_container", cascade="all, delete-orphan")
    task_assignments = db.relationship("TaskAssignment", backref="task_container", cascade="all, delete-orphan")

    #serializer rules
    serialize_rules = ("-tasks.task_container", "-task_assignments.task_container")

    #Validation
    @validates("name")
    def validates_tasks(self, key, prop):
        if key == "name":
            if 3 < len(prop) < 20:
                return prop
            else:
                return ValueError("gots ta be a string greater than 3 and less than 20 characters")
        else:
            return Exception("oops you did something wrong")

# class Entry(db.Model, SerializerMixin):
#     __tablename__ = "entries"

#     id = db.Column(db.Integer, primary_key=True)
#     feeling = db.Column(db.Integer)
#     notes = db.Column(db.String)
#     date = db.Column(db.String)

#     #relationship with User
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

#     #serializer rules
#     serialize_rules = ("-user.entries",)

#     #Validation
#     @validates("feeling", "notes", "date")
#     def validates_tasks(self, key, prop):
#         if key == "feeling":
#             if 0 < prop < 11:
#                 return prop
#             else:
#                 return ValueError("please choose a value between 1 and 10 (inclusive)")
#         if key == "notes":
#             if 3 < len(prop) < 20:
#                 return prop
#             else:
#                 return ValueError("gots ta be a string greater than 3 and less than 20 characters")
#         if key == "date":
#             # add conditions
#             return prop
#         else:
#             return Exception("oops you did something wrong")

class TaskAssignment(db.Model, SerializerMixin):
    __tablename__ = "task_assignments"

    id = db.Column(db.Integer, primary_key=True)
    complete = db.Column(db.Integer)
    
    #relationships with task_containers and users
    task_container_id = db.Column(db.Integer, db.ForeignKey("task_containers.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    #serializer rules
    serialize_rules = ("-task_container.task_assignments", "-user.task_assignments")
