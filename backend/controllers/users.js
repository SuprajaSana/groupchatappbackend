const UserDetails = require("../models/users");
const bcrypt = require("bcrypt");

function isStringValid(s) {
  if (s == undefined || s.length === 0) {
    return true;
  } else {
    return false;
  }
}

function isUserExists(x,y) {
  if (UserDetails.findAll({ where: { email: x } }) || UserDetails.findAll({where:{phonenumber:y}}) ||(UserDetails.findAll({ where: { email: x } }) && UserDetails.findAll({where:{phonenumber:y}}))) {
    return true;
  } else {
    return false;
  }
}

const signUpUserDetails = async (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const phonenumber = req.body.phonenumber;
  const password = req.body.password;

  if (
    isStringValid(userName) ||
    isStringValid(email) ||
    isStringValid(phonenumber) ||
    isStringValid(password)
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Required all fields" });
  }

  if (isUserExists(email,phonenumber)) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const saltrounds = 10;
  bcrypt.hash(password, saltrounds, async (err, hash) => {
    if (err) {
      console.log(err);
    }
    await UserDetails.create({
      userName: userName,
      email: email,
      phonenumber: phonenumber,
      password: hash,
    })
      .then((details) => {
        res.status(201).json({
          success: true,
          message: "Successfully created new user",
          userDetail: details,
        });
      })
      .catch((err) => {
        res.status(500).json({ success: true, message: err });
      });
  });
};

module.exports = {
  signUpUserDetails,
};
