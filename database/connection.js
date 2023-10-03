const { Sequelize } = require('sequelize');

const con = new Sequelize(
    process.env.DB_DATABASE, 
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
      {
    host: process.env.DB_HOST, // Replace with your MySQL host
    dialect: 'mysql',
});
con.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});
module.exports = con;
