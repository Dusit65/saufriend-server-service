//This file is used to manage routing for service/API calls
//This file works with user_tb
const userCtrl = require("./../controllers/user.controller.js");

//call express to use router module
const express = require("express");
const router = express.Router();

//Routing is based on RESTful API principles
//GET = ค้นหา ตรวจสอบ ดึง ดู, POST = เพิ่ม, PUT = แก้ไข, DELETE = ลบ
router.get("/:userName/:userPassword", userCtrl.checkLoginUser);
router.post("/",userCtrl.uploadUser,  userCtrl.createUser);
router.put("/:userId", userCtrl.uploadUser,userCtrl.editUser);
router.delete("/:userId", userCtrl.deleteUser);

//export router for call to use
module.exports = router;