const { validationResult } = require("express-validator");
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    return create(req, res, BASE_TABLE);
  },
  updateById: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    updateById(req, res, BASE_TABLE);
  },
  deleteById: (req, res) => deleteById(req, res, BASE_TABLE),
};

module.exports = customersController;
