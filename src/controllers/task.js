const pool = require("../utils/db");
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("./genericControler");

const BASE_TABLE = "tasks";

const tasksController = {
  getAll: (req, res) => getAll(req, res, BASE_TABLE),
  getById: (req, res) => getById(req, res, BASE_TABLE),
  getByTaskIdentifier: async (req, res) => {
    const { identifier } = req.body;

    try {
      const result = await pool.query(
        `SELECT * FROM tasks WHERE identifier = '${identifier}' AND deleted IS false`
      );
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },
  create: (req, res) => create(req, res, BASE_TABLE),
  updateById: (req, res) => updateById(req, res, BASE_TABLE),
  deleteById: (req, res) => deleteById(req, res, BASE_TABLE),
};

module.exports = tasksController;
