const User = require("../models/users");
const Messages = require("../models/messages");

exports.sendMessages = async (req, res, next) => {
  const msg = req.body.msg[0];
  const grpId = req.query.grpid;
  let fileurl;
  if (req.files[0]) {
     fileurl = req.files[0].path
  } else {
    fileurl=""
  }
  await Messages.create({
    message: msg,
    groupId: grpId,
    userDetailId: req.user.id,
    sentBy: req.user.userName,
    fileURL:fileurl
  })
    .then((message) => {
      res.status(201).json({
        success: true,
        message: "Successfully sent message",
        messages: message,
      });
    })
    .catch((err) => {
      res.status(500).json({ success: true, message: err });
    }); 
};


exports.getMessagesLoc = async (req, res, next) => {
  const id = req.query.lastmsgid;
  const grpid = req.query.grpid;
  await Messages.findAll({ where: { id: id,groupId:grpid } })
    .then((messages) => {
      res.status(200).json({
        messages: messages,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};


exports.getMessages = async (req, res, next) => {
  const grpid = req.query.grpid;
  await Messages.findAll({ where: { groupId: grpid } })
    .then((messages) => {
      res.status(200).json({
        messages: messages,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};