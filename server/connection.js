require("dotenv").config();

const mysql = require('mysql2');
const { Client } = require('ssh2');
const sshClient = new Client();

const dbServer = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true,
    connectionLimit: 10,
};

const tunnelConfig = {
    host: process.env.DB_SSH_HOST,
    port: 22,
    username: process.env.DB_SSH_USER,
    privateKey:
        require('fs').readFileSync('./portfolio-ssh-key.pem')
};

const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 3306,
    dstHost: dbServer.host,
    dstPort: dbServer.port
};

const SSHConnection = new Promise((resolve, reject) => {
    sshClient.on('ready', () => {
        sshClient.forwardOut(
            forwardConfig.srcHost,
            forwardConfig.srcPort,
            forwardConfig.dstHost,
            forwardConfig.dstPort,
            (err, stream) => {
                if (err) reject(err);
                const updatedDbServer = {
                    ...dbServer,
                    stream
                };

                // Create MySQL connection **********************************
                // const connection = mysql.createConnection(updatedDbServer);
                // connection.connect((error) => {
                //     if (error) {
                //         reject(error);
                //     }
                //     resolve(connection);
                // });

                // Create MySQL Promise pool **********************************
                const pool = mysql.createPool(updatedDbServer);
                const promisePool = pool.promise();
                if(promisePool) {
                    resolve(promisePool);
                } else {
                    reject(new Error('Failed to create promisePool'));
                }
            });
    }).connect(tunnelConfig);
});

module.exports = SSHConnection;

