const pool = require("../utils/db");

const getAll = async (req, res, table) => {
  try {
    const result = await pool.query(
      `SELECT * FROM ${table} WHERE deleted IS false ORDER BY id ASC`
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const getById = async (req, res, table) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(
      `SELECT * FROM ${table} WHERE id = ${id} AND deleted IS false`
    );
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const create = async (req, res, table) => {
  const body = { ...req.body };
  delete body.id;
  delete body.deleted;

  const fields = Object.keys(body).join(", ");
  const values = Object.values(body)
    .map((_, i) => `$${i + 1}`)
    .join(", ");

  try {
    const result = await pool.query(
      `INSERT INTO "${table}" (${fields}) VALUES (${values}) RETURNING *`,
      Object.values(body)
    );
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const updateById = async (req, res, table) => {
  const id = parseInt(req.params.id);
  const body = { ...req.body };
  delete body.id;
  delete body.deleted;

  const updates = Object.entries(body)
    .map(([key, value]) => `${key} = $${Object.keys(body).indexOf(key) + 1}`)
    .join(", ");

  try {
    const result = await pool.query(
      `UPDATE "${table}" SET ${updates} WHERE id = $${
        Object.keys(body).length + 1
      } AND deleted IS false RETURNING *`,
      [...Object.values(body), id]
    );
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const deleteById = async (req, res, table) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(
      `UPDATE ${table} SET deleted = true WHERE id = ${id} AND deleted IS false RETURNING *`
    );
    if (result.length > 0) {
      res.json({ message: "Record deleted" });
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = { getAll, getById, create, updateById, deleteById };
