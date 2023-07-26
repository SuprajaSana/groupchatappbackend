const express = require("express");

const usergrpController = require("../controllers/usergroup");

const userAuthentication = require("../middleware/auth");

const router = express.Router();

router.post(
  "/add/usertogrp",
  userAuthentication.authenticate,
  usergrpController.addusertogrp
);

module.exports = router;
