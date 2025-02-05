//File that works with a table in the database
//This file works with myfriend_tb

const Sequelize = require("sequelize");
const db = require("../db/db.js");

//create model to map with table in database
const Myfriend = db.define("myfriend_tb", {
    
    myfriendId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "myfriendId"
    },
    myfriendFullname: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: "myfriendFullname"
    },
    myfriendPhone: {
        type: Sequelize.STRING(10),
        allowNull: false,
        field: "myfriendPhone"
    },
    myfriendAge: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "myfriendAge"
    },
    myfriendMajor: {
        type: Sequelize.ENUM('IoT', 'DTI', 'IT'),
        allowNull: false,
        field: "myfriendMajor"
    },
    myfriendImage: {
        type: Sequelize.STRING(150),
        allowNull: false,
        field: "myfriendImage"
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "userId"
    },
},
    {
        tableName:"myfriend_tb",
        timestamps: false,//ถ้าต้องกรให้ในตารางมีการเก็บวันเวลา ให้เปลี่ยนเป็น true
        freezeTableName: true,
    
    
});

//export model for call to use
module.exports = Myfriend;