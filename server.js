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
const auth = require("./controllers/authorization");

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
  res.send("It is working");
});
app.post("/signin", signin.signinAuthentication(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.get("/profile/:userId", auth.requireAuth, profile.handleProfileGet(db));
app.post("/profile/:userId", auth.requireAuth, profile.handleProfileUpdate(db));
app.put("/imageurl", auth.requireAuth, image.handleApiCall());
app.put("/image", auth.requireAuth, image.handleImage(db));

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
