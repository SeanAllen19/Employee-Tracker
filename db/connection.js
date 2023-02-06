const mysql = require('mysql2');
const util = require('util');

// const PORT = process.env.PORT || 3001;

const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );
  
  connection.connect();
  connection.query = util.promisify(connection.query);

  module.exports = connection;