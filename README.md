<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css">

<h1 align="left">Kanbanistan Project API using NestJS <img src="https://nestjs.com/img/logo-small.svg" width="35" alt="Nest Logo" /> and MongoDB<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="35"/>

</h1>

<p align="left">Nest is a progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Primary Technology Stack

- <i class="devicon-nestjs-plain colored"></i> [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- <i class="devicon-express-original colored"></i> [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- <i class="devicon-mongodb-plain-wordmark colored"></i> [MongoDB](https://www.mongodb.com/) - MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.
- [Nest Mongoose](https://docs.nestjs.com/techniques/mongodb) - Nest Mongoose is a wrapper around the Mongoose npm package.
- <i class="devicon-typescript-plain colored"></i> [TypeScript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language which builds on JavaScript giving you better tooling at any scale.

- <i class="devicon-jest-plain colored"></i> [Jest](https://jestjs.io/) - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [Swagger](https://swagger.io/) - Simplify API development for users, teams, and enterprises with the Swagger open source and professional toolset. Find out how Swagger can help you design and document your APIs at scale.

## Description

REST API with authentication and user management to provide a complete backend solution for the
`kanbanistan` project.

### Functionalities

**Authentication**

- User can sign up with email/password
  - User can sign in with Google/Facebook/Twitter
  - User sign in with Google/Facebook/Twitter will be linked to the same account if the email is the same
  - User will receive a confirmation email
- User can sign in with email/password

**User**

- User can update his/her profile
- User can delete his/her account

**Board Management**

- User can create a board
- User can update a board
- User can delete a board

**Columns**

- User can create a column
- User can reorder columns
- User can update a column
- User can delete a column
- User can archive/unarchive a column

**Cards**

- User can create a card
- User can reorder cards
- User can update a card
- User can delete a card
- User can archive/unarchive a card
- User can add/remove a member to/from a card
- User can add/remove a label to/from a card
- User can add/remove a checklist to/from a card
- User can add/remove an attachment to/from a card
- User can add/remove a due date to/from a card
- User can add/remove a comment to/from a card
- User can add/remove a description to/from a card

## Requirements

- [Node.js](https://nodejs.org/en/) >= 14.15.4
- [NestJS CLI](https://docs.nestjs.com/cli/overview) >= 7.5.1
- [TypeScript](https://www.typescriptlang.org/) >= 4.1.3
- [MongoDB](https://www.mongodb.com/) >= 4.4.3
- [NPM](https://www.npmjs.com/) >= 6.14.10
- [Git](https://git-scm.com/) >= 2.30.0
- [Docker](https://www.docker.com/) >= 20.10.2
- [Docker Compose](https://docs.docker.com/compose/) >= 1.27.4

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

This project is currently developed and maintained by me. I plan to make this more functional and heartily support any issue submission or PR to the project. Thank you!

## Stay in touch

- Author - [Azaz Ahamed](https://azazahamed.com)
- Website - [https://azazahamed.com](https://azazahamed.com)
<!-- - Twitter - [@nestframework](https://twitter.com/nestframework) -->

## License

Nest is [MIT licensed](LICENSE).
