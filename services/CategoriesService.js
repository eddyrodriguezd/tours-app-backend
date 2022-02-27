const CategoriesSchema = require("../models/Categories");

const add = ({ description }) => CategoriesSchema.create({ description });

const getAll = () => CategoriesSchema.find();

module.exports = {
  add,
  getAll,
};
  