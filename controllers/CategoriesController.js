const CategoriesService = require("../services/CategoriesService");

register = async (req, res) => {
  try {
    const category = await CategoriesService.add(req.body);
    res.status(201).send({ message: "Category created", value: category });
  } catch (err) {
    res.status(400).send({ message: `Category couldn\'t be created. ${err}` });
  }
};

getAll = async (req, res) => {
  const categories = await CategoriesService.getAll();
  res.status(200).send({ value: categories });
};

module.exports = {
  register,
  getAll,
};
