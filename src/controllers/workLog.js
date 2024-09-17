const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("./genericControler");

const { validationResult } = require("express-validator");

const BASE_TABLE = "work_logs";

const workLogsController = {
  getAll: (req, res) => getAll(req, res, BASE_TABLE),
  getById: (req, res) => getById(req, res, BASE_TABLE),
  create: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    return create(req, res, BASE_TABLE)
  },
  updateById: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    return updateById(req, res, BASE_TABLE);
  },
  deleteById: (req, res) => deleteById(req, res, BASE_TABLE),
};

module.exports = workLogsController;
