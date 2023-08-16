Task Management System - Schemas
Project Description
This project implements a web-based Task Management System that enables users to effectively manage tasks and collaborate with team members. The system is built using Node.js and TypeScript, utilizing MongoDB as the database.

Schemas
User Schema
The User schema represents a registered user in the system.

Fields:

username: The username of the user. (String, required)
email: The email address of the user. (String, required)
password: The hashed password of the user. (String, required)
role: The role of the user (e.g., "admin," "user"). (String, required)
tasks: An array of task IDs assigned to the user. (Array of ObjectIds)
projects: An array of project IDs associated with the user. (Array of ObjectIds)


Task Schema
The Task schema represents a task that a user can create and manage.

Fields:

title: The title of the task. (String, required)
description: A description of the task. (String)
dueDate: The due date for completing the task. (Date, required)
status: The status of the task (e.g., "To Do," "In Progress," "Done"). (String, required)
priority: The priority level of the task (e.g., "low," "medium," "high"). (String)
labels: An array of labels to categorize the task (e.g., "Work," "Personal"). (Array of Strings)
assignedTo: The user ID to whom the task is assigned. (ObjectId)
project: The project ID to which the task belongs. (ObjectId)
Project Schema
The Project schema represents a collaborative project in the system.

Fields:

name: The name of the project. (String, required)
description: A description of the project. (String)
owner: The user ID of the project owner. (ObjectId, required)
tasks: An array of task IDs associated with the project. (Array of ObjectIds)
members: An array of user IDs who are members of the project. (Array of ObjectIds)


Getting Started
Clone this repository to your local machine.
Run npm install to install the required dependencies.
Set up your MongoDB connection by configuring the connection URI in your .env file.
Run npm run dev to start the application.
Access the application in your web browser at http://localhost:3000.
Technologies Used
Node.js
TypeScript
Express.js
MongoDB
bcryptjs (for password hashing)
jsonwebtoken (for authentication and authorization)



Authors
Mekuanint Abebe