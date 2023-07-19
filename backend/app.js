const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const User = require("./models/users.js");

var cors = require("cors");

const app = express();

app.use(cors());

const userRoutes = require("./routes/users");

app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));
