const handleProfileGet = db => (req, res) => {
  const { userId } = req.params;

  db.select("*")
    .from("users")
    .where({ id: userId })
    .then(
      user => {
        if (user.length) {
          res.json(user[0]);
        } else {
          res.status(400).json("Couldn't find a user with that ID");
        }
      },
      err => {
        res.status(400).json("Couldn't find a user with that ID");
      }
    );
};

const handleProfileUpdate = db => (req, res) => {
  const { userId } = req.params;
  const { name, age, pet } = req.body.formInput;

  db("users")
    .where({ id: userId })
    .update({ name: name })
    .then(resp => {
      if (resp) {
        res.json("Success updating user credentials");
      } else {
        res.status(400).json("Unable to update");
      }
    })
    .catch(err => res.status(400).json("Error updating user"));
};

module.exports = {
  handleProfileGet,
  handleProfileUpdate
};
