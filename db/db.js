//The file used to connect to the database.
const { Sequelize } = require("sequelize");

//call to use .env
require("dotenv").config();

//Create an instance to connect to the database with Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
    }
);

//connect to database
sequelize.sync().then(() => {
    console.log("Database connecting .....");
}).catch((err) => {
    console.log(err);
});

//export instance for call to use
module.exports = sequelize;
