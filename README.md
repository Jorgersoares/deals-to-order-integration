
## Description
- REST API with the purpose of integrating deals on [Pipedrive](https://www.pipedrive.com/pt) into orders on [Bling](https://www.bling.com.br/home)

## Installation

```bash
$ npm install
```
- Set MongoDBAtlas URI on .env
- Set Pipedrive API KEY on .env
- Set Bling API KEY on .env

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Using the app
- Integration is performed automatically through a task scheduled at 6 pm but can also be performed manually by making a GET request at that endpoint `/deals-order-integration`
- To obtain the import report, perform a GET request at that endpoint  `/orders-report`
- For more informations, read documentation section

## Documentation

To access the Swagger, type: `localhost:3000/api`

## Technology

- [Nest](https://github.com/nestjs/nest)
- [MongoDB](https://www.mongodb.com/)
- [MongoDBAtlas](https://www.mongodb.com/cloud/atlas)

