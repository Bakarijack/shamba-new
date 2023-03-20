const mysql = require('mysql2')
const credentials = require('../credentials')

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: credentials.pass,
    database: 'shamba'
});

con.connect((err) => {
    if (err) throw err
    console.log('connection ok')
})

module.exports = con