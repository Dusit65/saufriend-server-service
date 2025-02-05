const express = require("express"); // call express module to create web server
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/user.route"); // call to use router module
const myfriendRoute = require("./routes/myfriend.route");
require("dotenv").config(); // call to use .env


const app = express(); // create web server
const PORT = process.env.PORT || 3000;

//use middleware to จัดการต่าง
app.use(bodyParser.json());//adjust json data
app.use(cors());//allow access from any domain
app.use("/user", userRoute); //use router module
app.use("/myfriend", myfriendRoute);

//test call web server
app.get("/", (req, res) => {
  res.json({ message: "Hello from server port" + PORT }); //send message
});

//create web server connection from client/user
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
