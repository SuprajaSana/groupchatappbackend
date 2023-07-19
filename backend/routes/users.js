const express = require("express");

const usersController = require("../controllers/users");

const router = express.Router();

router.post("/user/signup", usersController.signUpUserDetails);

module.exports = router;
