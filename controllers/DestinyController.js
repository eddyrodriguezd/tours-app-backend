const DestinyService = require("../services/DestinyService");

const create = async (req, res) => {
  try {
    const destiny = await DestinyService.create(req.body);
    res.status(201).send({ message: "Destiny created", value: destiny });
  } catch (err) {
    res.status(400).send({ message: `Destiny couldn\'t be created. ${err}` });
  }
};

const find = async (req, res) => {
  try {
    const destiny = await DestinyService.find(req.params.city);
    res.status(200).send({ message: "", value: destiny });
  } catch (err) {
    res.status(404).send({ message: `City not found. ${err}` });
  }
};

const all = async (req, res) => {
  const destinies = await DestinyService.all();
  res.status(200).send({ value: destinies });
};

const update = async (req, res) => {
  try {
    const destiny = await DestinyService.update(req.params.id, req.body);
    res.status(200).send({ message: "Destiny updated", value: destiny });
  } catch (err) {
    res.status(400).send({ message: `Destiny couldn\'t be updated. ${err}` });
  }
};

const remove = async (req, res) => {
  try {
    await DestinyService.remove(req.params.id);
    res.status(200).send({ message: "Destiny deleted" });
  } catch (err) {
    res.status(400).send({ message: `Destiny couldn\'t be deleted. ${err}` });
  }
};

module.exports = { create, update, remove, find, all };
