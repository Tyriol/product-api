# Product RESTful API

## Description

Simple REST API server that uses an embedded in-memory database (SQLite3)
It serves product data, allowing the consumer to add, update and fetch product data

### Tech Stack

- Node.js
- Express
- SQLite3

### To get started

Clone the repo to your local machine

Install dependencies

```
npm install
```

Start the server

```
npm run start
```

You can test it's working by running the following command in another terminal while the server is running:

```
curl -X GET http://localhost:3000/api/products
```

You can then access the data however you would normally interact with an API (Postman, curl, fetch etc) via the url: `http://localhost:3000/api/`

### Update

There is now also a Front End for the API.

Open up `./public/index.html` in your browser to view and add new products

**To do**: Add view product details, edit and delete.

Enjoy!
