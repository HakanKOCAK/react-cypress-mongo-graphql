# Fooder
## _What is Fooder?_
> Fooder is an online food ordering app powered by React.js. Only purpose of the app is to try out some technologies and it is not a real life app.

## Features

- Login and Register to the system
- Add/Delete address information
- Add/Delete credit card information - not validated
- List restaurants based on user address
- Display restaurant menu, add items to cart
- Order food, display previous orders

## _Tech Stack_
- [React.js]
- [Node.js]
- [Apollo]
- [MongoDB]
- [GraphQL]
- [Cypress]
- [Express.js]

## Installation

> Fooder requires [Node.js] and [MongoDB] to run.
Install the dependencies for backend and frontend seperately.

Backend - make sure MongoDB is up and running at port 27017
```sh
cd fooder/server
yarn install
yarn start
```
Frontend
```sh
cd fooder/web
yarn install
yarn start
```

## Testing
> Fooder is tested with cypress. Test cases is created based on pre-created data on backend so make sure to run following commands based on used operating system.

Backend - Windows OS
```sh
cd fooder/server
yarn win-test
```

Backend - Linux or MacOS
```sh
cd fooder/server
yarn unix-test
```

Frontend
```sh
cd fooder/wen
npx cypress open
```

   [React.js]: <https://reactjs.org>
   [Node.js]: <https://nodejs.org>
   [Apollo]: <https://www.apollographql.com>
   [MongoDB]: <https://www.mongodb.com>
   [GraphQL]: <https://graphql.org>
   [Cypress]: <https://www.cypress.io>
   [Express.js]: <https://expressjs.com>
