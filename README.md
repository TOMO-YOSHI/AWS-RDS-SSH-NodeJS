# AWS-RDS-SSH-NodeJS

## About
This is a demo project to connect NodeJS server with AWS RDS(MySQL).

To run the server, set .env file and a pem key in the server directory.

### .env file should have these variables
// RDS config

DB_HOST=

DB_PORT=

DB_USER=

DB_PASS=

DB_NAME=

// SSH tunnel config

DB_SSH_HOST=

DB_SSH_USER=

### command
npm run start

### npm packages used in this project

- dotenv
- express
- mysql2
- ssh2
- nodemon

#### References:

https://medium.com/swlh/node-js-how-to-access-mysql-remotely-using-ssh-d45e21221039

https://medium.com/@devontem/nodejs-express-using-ssh-to-access-mysql-remotely-60372832dd08