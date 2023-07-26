const express = require("express");

const groupController = require("../controllers/groups");

const userAuthentication = require("../middleware/auth");

const router = express.Router();

router.post("/create/groups",userAuthentication.authenticate, groupController.createGrp);

router.get("/get/groups", userAuthentication.authenticate, groupController.getGrps);

router.get("/getusers/grps",groupController.getGrpsByUser)

module.exports = router;
