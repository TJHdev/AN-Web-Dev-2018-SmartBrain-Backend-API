const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const PORT = process.env.PORT || 4000;

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

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

app.get("/", (req, res) => {
  res.send("It is working!");
});
app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.get("/profile/:userId", profile.handleProfileGet(db));
app.put("/image", image.handleImage(db));
app.put("/imageurl", image.handleApiCall());

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
