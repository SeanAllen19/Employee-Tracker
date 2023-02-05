const mysql = require('mysql');
const util = require('util');
// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '5752564sean',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);


connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;