# Meetup API

Restfull CRUD API built on NodeJS, Express, PostgreSQL


## How to run
Open terminal in project root directory and enter the following commands:

`npm install` - install all dependecies used id the project

`npm run dev` - run project in dev mode
OR 
`npm run start` - run project in release mode

## Auth requests
To send requests related to meetups, you need to register or login. Only users with admin role can create, update and delete meetups. Unauthorized users can't view meetups.

- Follow `http://localhost:8080/register` to create profile. Send JSON with fields "name", "email" and "password".
If registation is successful, you get empty JSON and status code *201 Created*, otherwise - JSON with "error" field, that contains error message.

- Follow `http://localhost:8080/login` to login in your profile. Send JSON with fields "email" and "password".
If login is successful, you get json with accessToken and refreshToken, otherwise - JSON with "error" field, that contains error message.

All sent json will be validated on the server, if something goes wrong, you will get an error message.

## Meetups requests:

### Get

- Follow `http://localhost:8080/meetups` to get a list of all meetups
- Follow `http://localhost:8080/meetups/{id}` to get a meetup for the specified id

In addition, the ability to filter all meetups is implemented, for this you need to select a condition for filtering from the proposed

* _title_ — searching meetups by title field
* _description_ — searching meetups by description field
* _keywords_ - searching meetups by keywords field
* _date_ - filter meetups by date field
* _location_ - filter meetups by location field
* _sort_ — sort meetups by field
* _page_ — number of page (in one page 10 meetups)

- Follow `http://localhost:8080/meetups?title=test` to get a list of meetups with "test" in title

### POST

- Follow `http://localhost:8080/meetups` with JSON, that contains required fields "title", "date", "location" to create new meetup.

### PUT

- Follow `http://localhost:8080/meetups/{id}` with JSON, that contains required fields "title", "date", "location" to update meetup with specified id.


### DELETE

- Follow `http://localhost:8080/meetups/{id}` to delete meetup with specified id.

## Swagger

This api supports documentation using swagger. In order to update the data, you need to run the command `npm run swagger-autogen`.
- Follow `https://localhost:8080/api-docs` to view swagger documentation.
