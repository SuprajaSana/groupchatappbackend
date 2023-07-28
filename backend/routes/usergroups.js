const express = require("express");

const usergrpController = require("../controllers/usergroup");

const userAuthentication = require("../middleware/auth");

const router = express.Router();

router.post(
  "/add/usertogrp",
  userAuthentication.authenticate,
  usergrpController.addusertogrp
);

router.delete(
  "/removeuser/grp/:id",
  userAuthentication.authenticate,
  usergrpController.deleteUserFromGrp
);

router.post(
  "/makeuser/admin/:id",
  userAuthentication.authenticate,
  usergrpController.userChangeAsAdmin
);

module.exports = router;
