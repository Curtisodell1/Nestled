from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User():
    pass
    
class Task():
    pass
    
class TaskContainer():
    pass

class Entry():
    pass

class TaskAssignment():
    pass