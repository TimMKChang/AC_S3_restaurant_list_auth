# Restaurant List CRUD
Built by 
- [Node.js](https://nodejs.org/en/)
- [express](https://www.npmjs.com/package/express)
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [method-override](https://www.npmjs.com/package/method-override)
- [Passport](https://www.npmjs.com/package/passport)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Project Preview
#### Login
![Project Preview](/public/image/restaurant_list_auth_preview.PNG)

#### Show all restaurants
![Project Preview](/public/image/restaurant_list_auth_preview_2.PNG)

## Features
- CRUD: Create, Read, Update, and Delete
- Alert when Delete
- Search
- Sort
- Rating number showed by stars (hollow, half, and solid)
- Restaurant & User seeder
- Passport
- bcrypt
- Facebook login & Google login
- Store Facebook & Google's ID & SECRET by dotenv .env
- Partial template

| Method     | URL        | Action     |
|:----------:| ---------- | ---------- |
| GET        | /          | homepage   |
| GET        | /restaurants     | get all restaurants |
| GET        | /restaurants/new | get create page |
| GET        | /restaurants/:id | get one restaurants |
| POST       | /restaurants     | create restaurants   |
| GET        | /restaurants/:id/edit | get update page |
| PUT        | /restaurants/:id | update restaurants |
| DELETE     | /restaurants/:id | delete restaurants |
| GET        | /users/login    | get login page   |
| POST       | /users/login    | login   |
| GET        | /users/register | get register page   |
| POST       | /users/register | register   |
| GET        | /users/logout   | logout   |
| GET        | /auth/facebook  | login by Facebook   |
| GET        | /auth/facebook/callback   | Facebook login callback   |
| GET        | /auth/google    | login by Google   |
| GET        | /auth/google/callback     | Google login callback   |

## Installing
1. clone the project
>git clone https://github.com/TimMKChang/AC_S3_restaurant_list_auth.git
2. install packages
>npm install

3. run the server
>npm run start

It will run user and restaurant seeder and launch the server.

| email    | password | 
|----------|----------|
|user1@example.com|12345678|
|user2@example.com|12345678|
|user3@example.com|12345678|

4. check in cmd
>App is listening on [localhost:3000](http://localhost:3000)

## Contributor
<a href="https://github.com/TimMKChang" target="_blank">Tim Chang</a>
