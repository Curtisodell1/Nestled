from sqlalchemy_serializer import SerializerMixin
# from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import func
from datetime import datetime

from config import db
# bcrypt move to line 10

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    department = db.Column(db.String)
    start_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    #add relationships Entry and TaskAssignment
    task_assignments = db.relationship("TaskAssignment", backref="users", cascade="all, delete-orphan")
    entries = db.relationship("Entry", backref="users", cascade="all, delete-orphan")

    serialize_rules = 

    #Validation
    @validates("username", "department", "start_date")
    def validates_users(self, key, prop):
        if self == "username":
            if 3 < prop < 20:
                return prop
            else:
                return ValueError("gots ta be a string greater than 3 and less than 20 characters")
        if self == "department":
            if prop == "HR":
                return prop
        if self == "start_date":
            # add conditions
            return prop
        else:
            return Exception("oops you did something wrong")

class Task(db.Model, SerializerMixin):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    about = db.Column(db.String)
    time_requirement = db.Column(db.Integer)

    #Relationship with task container
    task_container_id = db.Column(db.Integer, db.ForeignKey("task_containers.id"))

    #Validation
    @validates("title", "about", "time_requirement")
    def validates_tasks(self, key, prop):
        if self == "title":
            if 3 < len(prop) < 20:
                return prop
            else:
                return ValueError("gots ta be a string greater than 3 and less than 20 characters")
        if self == "about":
            if 25 < len(prop) < 250:
                return prop
            else:
                return ValueError("gots ta be a string greater than 25 and less than 250 characters")
        if self == "time_requirement":
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

    #Validation
    @validates("name")
    def validates_tasks(self, key, prop):
        if self == "name":
            if 3 < len(prop) < 20:
                return prop
            else:
                return ValueError("gots ta be a string greater than 3 and less than 20 characters")
        else:
            return Exception("oops you did something wrong")

class Entry(db.Model, SerializerMixin):
    __tablename__ = "entries"

    id = db.Column(db.Integer, primary_key=True)
    feeling = db.Column(db.Integer)
    notes = db.Column(db.String)
    date = db.Column(db.String)

    #relationship with User
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    #Validation
    @validates("feeling", "notes", "date")
    def validates_tasks(self, key, prop):
        if self == "feeling":
            if 0 < prop < 11:
                return prop
            else:
                return ValueError("please choose a value between 1 and 10 (inclusive)")
        if self == "notes":
            if 3 < len(prop) < 20:
                return prop
            else:
                return ValueError("gots ta be a string greater than 3 and less than 20 characters")
        if self == "date":
            # add conditions
            return prop
        else:
            return Exception("oops you did something wrong")

class TaskAssignment(db.Model, SerializerMixin):
    __tablename__ = "task_assignments"

    id = db.Column(db.Integer, primary_key=True)
    
    #relationships with task_containers and users
    task_container_id = db.Column(db.Integer, db.ForeignKey("task_containers.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))