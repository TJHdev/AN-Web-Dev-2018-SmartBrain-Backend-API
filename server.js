const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "smart-brain"
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  db.select("*")
    .from("users")
    .then(
      users => {
        res.json(users);
      },
      err => {
        res.json("Couldn't retrieve users");
      }
    );
});

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt));

app.get("/profile/:userId", profile.handleProfileGet(db));

app.put("/image", image.handleImage(db));

app.listen(4000, () => {
  console.log("Server is up on port 4000");
});
