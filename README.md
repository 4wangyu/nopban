# nopban

[![CircleCI](https://circleci.com/gh/4wangyu/nopban/tree/master.svg?style=svg)](https://circleci.com/gh/4wangyu/nopban/tree/master)

## Development

### 1. Install dependencies
```
yarn
```

### 2. Set Up PostgreSQL Database

Install and start PostgreSQL.
```
brew install postgresql
brew services start postgresql
```

Login to postgres.
```
psql postgres
```

Create a user and password and give them create database access.
```
CREATE ROLE db_user WITH LOGIN PASSWORD 'password';
ALTER ROLE db_user CREATEDB;
```

Log out of the root user and log in to the newly created user.
```
\q
psql -d postgres -U db_user
```

Create a nopban database and connect to it.
```
CREATE DATABASE nopban;
\c nopban
```

Create a `.env` file at root path and add db connection details below to the file.
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=db_user
DB_PASSWORD=password
DB_DATABASE=nopban
SECRET=anything         # for jwt enc/dec
```

Create tables.
```
yarn build:db
```

Upgrade postgresql database if needed.
```
brew postgresql-upgrade-database
```

Drop database first if there is need to re-create the database.
```
DROP DATABASE IF EXISTS name;
```

### 3. Bring up project
```
yarn dev:db
yarn dev:be
yarn dev:fe
```

## Testing

If everything has been set up and ready to go for Heroku. You can test this by running the following command:
```
heroku local web
```

With this, you can go to `http://localhost:5000` and see what your app will look like on Heroku.


## Production

### Set up Heroku Postgres

Add `Heroku Postgres` as addon to the app.

Check to see if your add-on exists via Heroku CLI.

`heroku addons`

Log into the Heroku PostgreSQL instance.

`heroku pg:psql postgresql-whatever-00000 --app example-node-api`

From the root of the project where you have init.sql, run the following command to create your table and entries on Heroku Postgres.

`cat init.sql | heroku pg:psql postgresql-whatever-00000 --app example-node-api`

To reset production database:
`heroku pg:reset DATABASE_URL`

To run knex database migrations:
`heroku run npx knex migrate:latest`


## Debug heroku

### Tailing logs

`heroku logs -t`
