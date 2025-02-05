//File that works with a table in the database
//This file works with saufriend_tb

const Sequelize = require("sequelize");
const db = require("../db/db.js");

//create model to map with table in database
const User = db.define("user_tb", 
{
    userId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "userId"
    },
    userFullname: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: "userFullname"
    },
    userEmail: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: "userEmail"
    },
    userName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "userName"
    },
    userPassword: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "userPassword"
    },
    userImage: {
        type: Sequelize.STRING(150),
        allowNull: false,
        field: "userImage"
    }
},
    {
        tableName:"user_tb",
        timestamps: false,
        freezeTableName: true
    
    }

);

//export model for call to use
module.exports = User;