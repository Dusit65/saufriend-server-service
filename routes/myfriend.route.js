//This file is used to manage routing for service / API calls
//This file works with travel_tb
const myfriendCtrl = require("./../controllers/myfriend.controller.js");

//call express to use router module
const express = require("express");
const router = express.Router();

//Routing is based on RESTful API principles
//GET = ค้นหา ตรวจสอบ ดึง ดู, POST = เพิ่ม, PUT = แก้ไข, DELETE = ลบ
router.post("/", myfriendCtrl.uploadMyfriend, myfriendCtrl.createMyfriend);
router.get("/:userId", myfriendCtrl.getAllMyFriend);
router.get("/one/:myfriendId", myfriendCtrl.getMyFriend); //get selected myfriend
router.put("/:myfriendId", myfriendCtrl.uploadMyfriend, myfriendCtrl.editMyfriend);
router.delete("/:myfriendId", myfriendCtrl.deleteMyfriend);

//export router for call to use
module.exports = router;