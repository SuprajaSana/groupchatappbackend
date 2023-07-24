const User = require("../models/users");
const Messages = require("../models/messages");

exports.sendMessages = async (req, res, next) => {
  const msg = req.body.msg;
  await req.user
    .createMessage({
      message: msg,
    })
    .then((message) => {
      res
        .status(201)
        .json({
          success: true,
          message: "Successfully sent message",
          messages: message,
        })
    })
    .catch((err) => {
      res.status(500).json({ success: true, message: err });
    });
};

exports.getMessages = async (req, res, next) => {
  const id=req.query.lastmsgid
  await Messages.findAll({where:{id:id}})
    .then((messages) => {
      res.status(200).json({
        messages: messages,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

/* exports.getNewMsgs = async (req, res, next)=>{
  const id = req.query.lastmsgid;
  await Messages.findAll({where:{id:id}})
    .then((messages) => {
      res.status(200).json({
        messages: messages,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
} */
