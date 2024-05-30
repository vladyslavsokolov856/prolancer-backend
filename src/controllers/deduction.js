const pool = require("../utils/db");
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("./genericControler");

const BASE_TABLE = "deductions";

const deductionsController = {
  getAll: (req, res) => getAll(req, res, BASE_TABLE),
  getById: (req, res) => getById(req, res, BASE_TABLE),
  create: async (req, res) => {
    const { image_url, id, deleted, ...data } = req.body;
    const { filename } = req.file;
    console.log(req.file);

    const fields = Object.keys(data).join(", ");
    const values = Object.values(data)
      .map((_, i) => `$${i + 1}`)
      .join(", ");

    try {
      let [result] = await pool.query(
        `INSERT INTO "${BASE_TABLE}" (${fields}) VALUES (${values}) RETURNING *`,
        Object.values(data)
      );

      [result] = await pool.query(
        `UPDATE "${BASE_TABLE}" SET image_url = $1 WHERE id = $2 AND deleted IS false RETURNING *`,
        [`/api/deductions/${result.id}/attachments/${filename}`, result.id]
      );

      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },
  updateById: (req, res) => updateById(req, res, BASE_TABLE),
  deleteById: (req, res) => deleteById(req, res, BASE_TABLE),
};

module.exports = deductionsController;
