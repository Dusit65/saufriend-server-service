//File that writes control operations for a table in the database
//เช่น insert, update, delete, select
//This file works with user_tb\
const multer = require("multer");
const User = require("./../models/user.model.js");
const path = require("path");
const fs = require("fs");

exports.createUser = async (req, res) => {
  try {
    //ตัวแปร
    let data = {
      ...req.body,
      userImage: req.file ? req.file.path.replace("images\\user\\", "") : "",
    };
    const result = await User.create(data);
    res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//func check login in user_tb ====================================================
exports.checkLoginUser = async (req, res) => {
  try {
    const result = await User.findOne({
      where: {
        userName: req.params.userName,
        userPassword: req.params.userPassword,
      },
    });
    if (result) {
      res.status(200).json({
        message: "user login succesfully",
        data: result,
      });
    } else {
      res.status(404).json({
        message: "user login failed",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//func edit profile user in user_tb =====================================================
exports.editUser = async (req, res) => {
  try {
    //มีการตรวจสอบก่อนว่ามีไฟล์ที่อัปโหลดหรือไม่
    //กรณีที่มีร ตรวจสอบก่อนว่ามีไฟล์ที่อัปโหลดหรือไม่ ถ้ามีให้ลบไฟล์เก่าทิ้งไปด้วย
    let data = {
      ...req.body,
    };
    if (req.file) {
      //ค้นหาเพื่อเอารูป
      const user = await User.findOne({
        where: {
          userId: req.params.userId,
        },
      });

      if (user.userImage) {
        //ตรวจสอบกรณีที่มีรูป
        const oldImagePath = "images/user/" + user.userImage; //ลบไฟล์เก่าทิ้ง
        fs.unlink(oldImagePath, (err) => {
          console.log(err);
        });
      }
      data.userImage = req.file.path.replace("images\\user\\", "");
    } else {
      delete data.userImage;
    }

    const result = await User.update(data, {
      where: {
        userId: req.params.userId,
      },
    });
    res.status(200).json({
      message: "user updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//func Delete User in user_tb ====================================================
exports.deleteUser = async (req, res) => {
  try {
    //ค้นหาเพื่อเอารูป
    const user = await User.findOne({
      where: {
        userId: req.params.userId,
      },
    });

    if (user.userImage) {
      //ตรวจสอบกรณีที่มีรูป
      const oldImagePath = "images/user/" + user.userImage; //ลบไฟล์เก่าทิ้ง
      fs.unlink(oldImagePath, (err) => {
        console.log(err);
      });
    }
    const result = await User.destroy({
      where: {
        userId: req.params.userId,
      },
    });
    res.status(200).json({
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//User Image upload function==========================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/user");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "user_" +
        Math.floor(Math.random() * Date.now()) +
        path.extname(file.originalname)
    );
  },
});
exports.uploadUser = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: Images Only!");
  },
}).single("userImage");
