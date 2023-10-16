#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, TaskContainer

fake = Faker()

def create_users():
    u1 = User()
    u1.username = "Curtis"
    u1.password_hash = "lovelyisgreat"
    users = u1

    return(users)

def create_task_containers():
    all_task_containers = []
    for x in range(10): 
        t = TaskContainer (
        name = fake.name()
        )
        all_task_containers.append(t)
    return all_task_containers

# def create_task_containers():
#     all_task_containers = []
#     for x in range(10): 
#         t = TaskContainer (
#         name = fake.name()
#         )
#         all_task_containers.append(t)
#     return all_task_containers

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing DB...")
        db.drop_all()
        print("Creating tables...")
        db.create_all()
        print("Starting seed...")
        users = create_users()
        task_containers = create_task_containers()
        db.session.add(users)
        db.session.add_all(task_containers)
        db.session.commit()

    
