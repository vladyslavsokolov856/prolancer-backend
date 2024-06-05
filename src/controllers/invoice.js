const pgp = require("pg-promise")();
const { getAll, getById, deleteById } = require("./genericControler");
const pool = require("../utils/db");

const BASE_TABLE = "invoices";

const invoicesController = {
  getAll: (req, res) => getAll(req, res, BASE_TABLE),
  getById: (req, res) => getById(req, res, BASE_TABLE),
  create: async (req, res) => {
    const { order_lines = [], id, deleted, ...rest } = req.body;

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
      console.log(err);
      res.status(400).json({ error: err });
    }
  },
  updateById: async (req, res) => {
    const invoiceId = req.params.id;

    const { order_lines = [], id, deleted, ...rest } = req.body;

    const updates = Object.entries(rest)
      .map(([key, value]) => `${key} = $${Object.keys(rest).indexOf(key) + 1}`)
      .join(", ");

    try {
      const result =
        (await pool.query(
          `UPDATE "${BASE_TABLE}" SET ${updates} WHERE id = $${
            Object.keys(rest).length + 1
          } AND deleted IS false RETURNING *`,
          [...Object.values(rest), id]
        )) + `WHERE id = ${invoiceId} AND status = draft`;

      const insertColumns = new pgp.helpers.ColumnSet(
        ["description", "quantity", "unit_price", "invoice_id"],
        { table: "order_lines" }
      );

      const newLines = order_lines
        .filter(({ id }) => !id)
        .map((order) => ({
          ...order,
          invoice_id: invoiceId,
        }));
      const insertLines =
        newLines.length && pgp.helpers.insert(newLines, insertColumns);

      const updateColumns = new pgp.helpers.ColumnSet(
        ["description", "quantity", "unit_price", "invoice_id", "id"],
        { table: "order_lines" }
      );
      const oldLines = order_lines.filter(({ id }) => id);
      const updateLines =
        oldLines.length &&
        pgp.helpers.update(oldLines, updateColumns) + ` WHERE v."id" = t.id`;

      await pool.tx(async (t) => {
        const idsInArray = order_lines.map((d) => d.id);
        if (idsInArray.length) {
          await t.none(
            "DELETE FROM order_lines WHERE id NOT IN (${ids:csv})" +
              ` AND invoice_id = ${invoiceId}`,
            {
              ids: idsInArray,
            }
          );
        } else {
          await t.none(
            "DELETE FROM order_lines WHERE" + ` invoice_id = ${invoiceId}`
          );
        }

        if (insertLines) await t.none(insertLines);
        if (updateLines) await t.none(updateLines);
      });

      res.status(201).json(result[0]);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err });
    }
  },
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
