const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: "1",
      name: "Thomas",
      email: "thomas@gmail.com",
      password: "apples",
      entries: 0,
      joined: new Date()
    },
    {
      id: "2",
      name: "Clare",
      email: "clare@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  console.log(req.body);
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    database.users.push({
      id: "15",
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
  } else {
    res.status(400).json("Error: must provide all fields");
  }
});

app.get("/profile/:userId", (req, res) => {
  const { userId } = req.params;

  const foundUser = database.users.find(user => {
    return user.id === userId;
  });

  if (foundUser) {
    res.json(foundUser);
  } else {
    res.json("No user found with that ID");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;

  const foundUser = database.users.find(user => {
    return user.id === id;
  });

  if (foundUser) {
    foundUser.entries++;
    res.json(foundUser.entries);
  } else {
    res.json("No user found with that ID");
  }
});

app.listen(4000, () => {
  console.log("Server is up on port 4000");
});
