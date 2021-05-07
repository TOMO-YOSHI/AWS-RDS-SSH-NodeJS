const express = require('express');
const db = require('./connection');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("listening port 3000");
});

// End point for promise ***************
app.get('/', (req, res) => {
    db.then((connection) => {

        connection.query(`
            select * from firsttb;
        `).then(([rows, fields]) => {
            res.send(rows);
        })

    })
});

// End point for connection ***************
// app.get('/', (req, res) => {
//     db.then((connection) => {

//         connection.query(`
//             select * from firsttb;
//             `, (error, results, fields) => {
//                 if(error) {
//                     console.log('error');
//                     return;
//                 }

//             res.send(results);
//             }
//         )

//     })
// });