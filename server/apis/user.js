const express = require("express");
const user = express.Router();
const use = require("../util/util").use;
const userController = require("../controllers/userController");

user.post("/signup", use(userController.userSignup));
// user.post("/login", use(userController.userSignup));

module.exports = user;
