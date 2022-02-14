const express = require("express");

const CategoriesController = require("../controllers/CategoriesController");

const api = express.Router();

api.post("/", CategoriesController.register);
api.get("/", CategoriesController.getAll);

module.exports = api;
