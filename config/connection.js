//import the sequalize constructor from library
const Sequalize = require('sequelize');
//load enviroment variables
require('dotenv').config();

// create connection to our database, pass in your MySQL information for username and passowrd

const sequelize = new Sequalize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;