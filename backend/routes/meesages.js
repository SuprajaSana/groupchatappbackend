const express = require("express");

const chatController = require("../controllers/messages");

const userAuthentication = require("../middleware/auth");

const multer = require("multer");

const router = express.Router();

 var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "/send/messages");
  },
  filename: function (req, file, callback) {
    callback(null,file.originalname);
  },
});
const upload = multer({ storage: storage }); 

router.post("/send/messages",upload.array("files"), userAuthentication.authenticate, chatController.sendMessages);

router.get(
  "/get/messages",
  userAuthentication.authenticate,
  chatController.getMessagesLoc
);

router.get(
  "/get/grpmessages",
  userAuthentication.authenticate,
  chatController.getMessages
);

module.exports = router;
