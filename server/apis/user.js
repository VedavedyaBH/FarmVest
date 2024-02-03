const express = require("express");
const user = express.Router();
const use = require("../util/util").use;
const userController = require("../controllers/userController");
const farmController = require("../controllers/farmController");
const walletController = require("../controllers/walletController");
const verifyJWT = require("../util/jwtAuth").verifyJWT;

user.post("/signup", use(userController.userSignup));
user.post("/login", use(userController.userLogin));
user.post("/user", verifyJWT, use(userController.getUserByEmail));
user.get("/farms/:id", use(farmController.getFarmById));
user.get("/farms", use(farmController.getAllFarms));
user.get("/orders", verifyJWT, use(userController.getAllOrders));
user.post("/orders", verifyJWT, use(userController.placeOrder));
user.get("/wallet", verifyJWT, use(walletController.getBalance));
user.post("/wallet", verifyJWT, use(walletController.addBalance));
user.delete("/wallet", verifyJWT, use(walletController.withdrawAmount));
user.delete("/orders", verifyJWT, use(userController.removeOrder));

module.exports = user;
