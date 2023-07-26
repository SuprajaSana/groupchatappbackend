const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const User = require("./models/users.js");
const Messages = require("./models/messages");
const Group = require("./models/groups");
const UserGrp = require("./models/usergroup");

var cors = require("cors");

const app = express();

app.use(cors());

const userRoutes = require("./routes/users");
const chatRoutes = require("./routes/meesages");
const grpRoutes = require("./routes/groups");
const usergroupRoutes=require('./routes/usergroups')

app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);
app.use(chatRoutes);
app.use(grpRoutes);
app.use(usergroupRoutes);

User.hasMany(Messages);
Messages.belongsTo(User); 

User.belongsToMany(Group, { through: UserGrp });

Group.hasMany(Messages);
Messages.belongsTo(Group); 

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));
