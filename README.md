# nopban

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
COOKIE=api_cookie_url
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

If there is problem bring up postgres, check the logs for debugging:
```
code /usr/local/var/log/postgresql@14.log
```

### 3. Bring up project

```
yarn dev:db
yarn dev:be
yarn dev:fe
```

### 4. Districution

```
yarn dist
```

### 5. Register as a service on windows

[Register PM2 as a service in the windows server](https://lakin-mohapatra.medium.com/register-pm2-as-a-service-in-the-windows-server-747f19e2ff2a)

## Backup and Restore Database

```
heroku pg:backups:capture --app nopban

heroku pg:backups:download --app nopban // exports file latest.dump

createdb <new_db_name>;

pg_restore --verbose  --no-acl --no-owner --role=nb_admin -d <db_name> prod.dump
```
