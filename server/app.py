#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, session
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from flask import Flask, request, make_response

# Local imports
from config import app, db, api
# Add your model imports

from models import User, Task, TaskContainer, Entry, TaskAssignment

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

