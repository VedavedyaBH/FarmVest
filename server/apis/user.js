const express = require("express");
const user = express.Router();
const use = require("../util/util").use;
const userController = require("../controllers/userController");
const farmController = require("../controllers/farmController");
const verifyJWT = require("../util/jwtAuth").verifyJWT;

user.post("/signup", use(userController.userSignup));
user.post("/login", use(userController.userLogin));
user.get("/farms/:id", use(farmController.getFarmById));
user.get("/farms", use(farmController.getAllFarms));
user.get("/orders", verifyJWT, use(userController.getAllOrders));
user.post("/orders", verifyJWT, use(userController.placeOrder));
user.delete("/orders", verifyJWT, use(userController.removeOrder));

module.exports = user;
