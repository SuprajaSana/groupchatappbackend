const UserGrp = require("../models/usergroup");

exports.addusertogrp = async (req, res, next) => {
  const userId = req.body.userid;
  const name = req.body.userName;
  const grpid = req.body.grpid;
  await UserGrp.create({
    userDetailId: userId,
    groupId: grpid,
    name: name,
    isAdmin: false,
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

exports.userChangeAsAdmin = async (req, res, next) => {
  const userId = req.body.userid;
  const name = req.body.userName;
  const grpid = req.body.grpid;
  const id = req.params.id;
  UserGrp.findAll({ where: { id: id } })
    .then((user) => {
      (user[0].id = id),
        (user[0].name = name),
        (user[0].userDetailIdd = userId),
        (user[0].groupId = grpid),
        (user[0].isAdmin = true);
      return user[0].save();
    })
    .then(() => {
       res.status(201).json({ success: true, message: "Updated successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteUserFromGrp = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await UserGrp.destroy({ where: { id: userId } }).then(() => {
      res.status(201).json({ success: true, message: "Deleted successfully" });
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
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
