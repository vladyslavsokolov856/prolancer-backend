const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("./genericControler");

const BASE_TABLE = "invoices";

const invoicesController = {
  getAll: (req, res) => getAll(req, res, BASE_TABLE),
  getById: (req, res) => getById(req, res, BASE_TABLE),
  create: (req, res) => create(req, res, BASE_TABLE),
  updateById: (req, res) => updateById(req, res, BASE_TABLE),
  deleteById: (req, res) => deleteById(req, res, BASE_TABLE),
};

module.exports = invoicesController;
