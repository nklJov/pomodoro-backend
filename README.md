# pomodoro-backend

POMODORO BACKEND

desc: Backend implementaton of an pomodoro timer website

author: Nikola Jovicic(2021)

available endpoints: 

GET "/todos" (params: userId) : Fetches todos from db for specific userId

POST "/todos" (params: {todo}) : Create and insert new ToDo

POST "/createUser" (params: {user}) : Create and insert new User

POST "/login" (params: {user}) : This end point will compare given user with same user in DB and log him in if they match 

