const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "27d7e66e698a4327a7d49020ab4a53ca"
});

const handleApiCall = () => (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(res => res.json())
    .catch(err => res.status(400).json(err.detail));
};

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
  handleImage,
  handleApiCall
};
