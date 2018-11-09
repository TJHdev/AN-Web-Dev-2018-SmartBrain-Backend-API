const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const PORT = process.env.PORT || 4000;

const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI
});

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("It is working!");
});

// app.get("/", (req, res) => {
//   db.select("*")
//     .from("users")
//     .then(
//       users => {
//         res.json(users);
//       },
//       err => {
//         res.json("Couldn't retrieve users");
//       }
//     );
// });

app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.get("/profile/:userId", profile.handleProfileGet(db));
app.put("/imageurl", image.handleApiCall());
app.put("/image", image.handleImage(db));
// app.post("/test", image.test());
// app.post("/simpletest", image.test());

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
