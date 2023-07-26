const Groups = require("../models/groups");

exports.createGrp = async (req, res, next) => {
  const grp = req.body.grp;
  const name = req.user.userName;
  await req.user
    .createGroup({
      grpName: grp,
      createdBy: name,
    })
    .then((grps) => {
      res.status(201).json({
        success: true,
        message: "Successfully created group",
        grpName: grps,
      });
    })
    .catch((err) => {
      res.status(500).json({ success: true, message: err });
    });
};

exports.getGrps = async (req, res, next) => {
  try {
    await req.user
      .getGroups()
      .then((grps) => {
        res.status(200).json({
          grps: grps,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getGrpsByUser = async (req, res, next) => {
    const grpid = req.query.grpid;
    try {
      await Groups.findAll({where:{id:grpid}})
          .then((grps) => {
          res.status(200).json({
            grps: grps,
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    } catch (err) {
      res.status(500).json({ error: err });
    }
}
