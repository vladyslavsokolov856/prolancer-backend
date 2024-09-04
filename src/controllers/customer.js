const pool = require("../utils/db");
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("./genericControler");

const BASE_TABLE = "customers";

const customersController = {
  getAll: (req, res) => getAll(req, res, BASE_TABLE),
  getById: (req, res) => getById(req, res, BASE_TABLE),
  create: (req, res) => {
    req.body.ean = req.body.ean === "" ? null : req.body.ean
    console.log(req.body)
    return create(req, res, BASE_TABLE);
  },
  updateById: (req, res) => updateById(req, res, BASE_TABLE),
  deleteById: (req, res) => deleteById(req, res, BASE_TABLE),
};

module.exports = customersController;
