const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const User = require("./models/users.js");
const Messages=require("./models/messages")

var cors = require("cors");

const app = express();

app.use(cors());

const userRoutes = require("./routes/users");
const chatRoutes=require("./routes/meesages")

app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);
app.use(chatRoutes);

User.hasMany(Messages);
Messages.belongsTo(User); 

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));
