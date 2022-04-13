const express = require("express");

const Destiny = require("../controllers/DestinyController");

const api = express.Router();

api.post("/", Destiny.create);
api.get("/", Destiny.all);
api.put("/:id", Destiny.update);
api.delete("/:id", Destiny.remove);
api.get("/:city", Destiny.find);

module.exports = api;
