#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, TaskContainer, Task, TaskAssignment

fake = Faker()

def create_users():
    u1 = User()
    u1.username = "Curtis"
    u1.password_hash = "lovelyisgreat"
    users = u1

    return(users)

def create_task_containers():
    all_task_containers = []
    t1 = TaskContainer(
        name = "Human Resources"
    )
    t2 = TaskContainer(
        name = "Sales"
    )
    t3 = TaskContainer(
        name = "Engineering"
    )
    return[t1,t2,t3]

def create_task():
    task_container = []
    td1 = Task(
    title = "Test1",
    about = "This will be a lengthy description based on rules.",
    time_requirement = 15,
    task_container_id = 1
    )
    td2 = Task(
    title = "Test2",
    about = "This will be a lengthy description based on rules.",
    time_requirement = 15,
    task_container_id = 3
    )
    td3 = Task(
    title = "Test3",
    about = "This will be a lengthy description based on rules.",
    time_requirement = 15,
    task_container_id = 1
    )
    return[td1, td2, td3]

def task_assignments():
    task_assignment = []
    ta1 = TaskAssignment(
    complete = False,
    task_container_id = 3,
    user_id = 1
    )
    ta2 = TaskAssignment(
    complete = False,
    task_container_id = 2,
    user_id = 1
    )
    return [ta1, ta2]

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
        tasks = create_task()
        task_assignment = task_assignments()
        db.session.add(users)
        db.session.add_all(task_containers)
        db.session.add_all(tasks)
        db.session.add_all(task_assignment)
        db.session.commit()

    
