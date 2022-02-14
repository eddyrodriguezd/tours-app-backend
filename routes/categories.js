const express = require("express");

const CategoriesController = require("../controllers/CategoriesController");

const api = express.Router();

api.post("/category", CategoriesController.register);
api.get("/category", CategoriesController.getAll);

module.exports = api;
