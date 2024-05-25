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
  getAll: async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT
            json_build_object(
                'id', invoices.id,
                'status', invoices.status,
                'created_date', invoices.created_date,
                'updated_date', invoices.updated_date,
                'invoice_date', invoices.invoice_date,
                'customer_payment_date', invoices.customer_payment_date,
                'note', invoices.note,
                'currency', invoices.currency,
                'hours_worked', invoices.hours_worked,
                'send_invoice_copy_to', invoices.send_invoice_copy_to,
                'user_id', invoices.user_id,
                'customer_id', invoices.customer_id,
                'vat_percentage', invoices.vat_percentage,
                'deleted', invoices.deleted,
                'task_id', invoices.task_id,
                'payment_days', invoices.payment_days,
                'customer', CASE
                    WHEN invoices.customer_id IS NULL THEN NULL
                    ELSE json_build_object(
                        'customer_id', customers.id,
                        'user_id', customers.user_id,
                        'type', customers.type,
                        'language', customers.language,
                        'company_name', customers.company_name,
                        'name_contact_person', customers.name_contact_person,
                        'email_contact_person', customers.email_contact_person,
                        'phone_contact_person', customers.phone_contact_person,
                        'address', customers.address,
                        'city', customers.city,
                        'postal_code', customers.postal_code,
                        'country', customers.country,
                        'payment_due_days', customers.payment_due_days,
                        'company_id', customers.company_id,
                        'ean', customers.ean,
                        'deleted', customers.deleted
                    )
                END,
                'order_lines', coalesce(json_agg(
                    json_build_object(
                        'order_line_id', order_lines.id,
                        'description', order_lines.description,
                        'quantity', order_lines.quantity,
                        'unit_price', order_lines.unit_price,
                        'deleted', order_lines.deleted
                    ) ORDER BY order_lines.id) FILTER (WHERE order_lines.deleted = false), '[]'::json)
            ) AS invoice
        FROM
            invoices
        LEFT JOIN
            customers ON invoices.customer_id = customers.id AND customers.deleted = false
        LEFT JOIN
            order_lines ON invoices.id = order_lines.invoice_id AND order_lines.deleted = false
        WHERE
            invoices.deleted = false
        GROUP BY
            invoices.id, customers.id
        ORDER BY
            invoices.id DESC;
      `);
      res.json(
        result.map(({ invoice }) => {
          let amount = 0;
          invoice.order_lines.forEach((orderLine) => {
            const quantity = orderLine.quantity || 0;
            const unitPrice = orderLine.unit_price || 0;
            amount += quantity * unitPrice;
          });
          invoice.amount = amount;
          return invoice;
        })
      );
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },
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
