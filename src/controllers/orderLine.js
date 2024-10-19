const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("./genericControler");
const pool = require("../utils/db");

const BASE_TABLE = "order_lines";

const orderLinesController = {
  getAll: (req, res) => getAll(req, res, BASE_TABLE),
  getById: (req, res) => getById(req, res, BASE_TABLE),
  create: (req, res) => create(req, res, BASE_TABLE),
  updateById: (req, res) => updateById(req, res, BASE_TABLE),
  deleteById: (req, res) => deleteById(req, res, BASE_TABLE),
  getInvoiceById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM order_lines WHERE deleted IS false AND invoice_id=$1', [id])
      return res.json(result)
    } catch (error) {
      res.status(400).json({ error })
    }
  },
};

module.exports = orderLinesController;
