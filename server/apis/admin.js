const express = require("express");
const admin = express.Router();
const use = require("../util/util").use;
const userController = require("../controllers/userController");
const farmController = require("../controllers/farmController");
const verifyJWT = require("../util/jwtAuth").verifyJWT;
const upload = require("../util/uploadFiles");

// const verifyJWT = require("../util/jwtAuth").verifyJWT;

// user.post("/signup", use(userController.userSignup));
// user.post("/login", use(userController.userLogin));
admin.post("/farms", upload, use(farmController.addFarms));
admin.delete("/farms/:id", use(farmController.deleteFarmById));

module.exports = admin;
