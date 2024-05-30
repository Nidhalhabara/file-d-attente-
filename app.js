const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'post_office_queue'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// إضافة عميل جديد
app.post('/addClient', (req, res) => {
    let client = { name: req.body.name };
    let sql = 'INSERT INTO clients SET ?';
    db.query(sql, client, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: result.insertId });
    });
});

// إضافة تذكرة جديدة
app.post('/addTicket', (req, res) => {
    let ticket = { client_id: req.body.client_id, service: req.body.service, queue_number: req.body.queue_number };
    let sql = 'INSERT INTO tickets SET ?';
    db.query(sql, ticket, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('Ticket added...');
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
