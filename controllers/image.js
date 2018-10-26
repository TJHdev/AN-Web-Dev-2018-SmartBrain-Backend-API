const handleImage = db => (req, res) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(
      entries => {
        res.json(entries[0]);
      },
      err => {
        res.status(400).json("Couldn't increment entries for that user.");
      }
    );
};

module.exports = {
  handleImage
};
