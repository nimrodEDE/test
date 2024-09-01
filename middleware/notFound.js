const notFound = (req, res) => {
  res.status(404).send("The page was not found");
};

module.exports = notFound;
