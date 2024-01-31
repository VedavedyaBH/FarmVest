const express = require("express");
const admin = express.Router();
const use = require("../util/util").use;
const userController = require("../controllers/userController");
const farmController = require("../controllers/farmController");
const verifyJWT = require("../util/jwtAuth").verifyJWT;

// user.post("/signup", use(userController.userSignup));
// user.post("/login", use(userController.userLogin));
admin.post("/farms", use(farmController.addFarms));

module.exports = admin;
