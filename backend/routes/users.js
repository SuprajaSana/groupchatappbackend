const express = require("express");

const usersController = require("../controllers/users");

const router = express.Router();

router.post("/user/signup", usersController.signUpUserDetails);

router.post("/user/login", usersController.loginUserDetails);

router.get("/get/users", usersController.getUsersDetails);

module.exports = router;
