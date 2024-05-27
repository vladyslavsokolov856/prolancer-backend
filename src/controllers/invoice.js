const pgp = require("pg-promise")();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("./genericControler");
const pool = require("../utils/db");

const BASE_TABLE = "invoices";

const invoicesController = {
  getAll: (req, res) => getAll(req, res, BASE_TABLE),
  getById: (req, res) => getById(req, res, BASE_TABLE),
  create: async (req, res) => {
    const { order_lines, id, deleted, ...rest } = req.body;

    const fields = Object.keys(rest).join(", ");
    const values = Object.values(rest)
      .map((_, i) => `$${i + 1}`)
      .join(", ");

    try {
      const result = await pool.query(
        `INSERT INTO "${BASE_TABLE}" (${fields}) VALUES (${values}) RETURNING *`,
        Object.values(rest)
      );

      const cs = new pgp.helpers.ColumnSet(
        ["description", "quantity", "unit_price", "invoice_id"],
        { table: "order_lines" }
      );
      const insertLines = pgp.helpers.insert(
        order_lines.map((order) => ({
          ...order,
          invoice_id: result[0].id,
        })),
        cs
      );
      await pool.none(insertLines);

      res.status(201).json(result[0]);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },
  updateById: (req, res) => updateById(req, res, BASE_TABLE),
  deleteById: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const result = await pool.query(
        `SELECT * FROM ${BASE_TABLE} WHERE id = ${id} AND deleted IS false`
      );

      if (!(result.length > 0)) {
        res.status(404).json({ error: "Record not found" });
        return;
      }

      const invoice = result[0];
      if (invoice.status === "draft") {
        return deleteById(req, res, BASE_TABLE);
      }

      res.status(400).json({ error: "Only draft invoices can be deleted." });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },
};

module.exports = invoicesController;
