const UserGrp = require("../models/usergroup");

exports.addusertogrp = async (req, res, next) => {
  const userId = req.body.userid;
  const name = req.body.userName;
  const grpid = req.body.grpid;
  await UserGrp.create({
    userDetailId: userId,
    groupId: grpid,
    name: name,
  })
    .then(() => {
      res.status(201).json({
        success: true,
        message: "Successfully added to group",
      });
    })
    .catch((err) => {
      res.status(500).json({ success: true, message: err });
    });
};

exports.getGrpUsersDetails = async (req, res, next) => {
  const grpid = req.query.grpid;
  await UserGrp.findAll({ where: { groupId: grpid } })
    .then((grp) => {
      res.status(200).json({
        grps: grp,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
