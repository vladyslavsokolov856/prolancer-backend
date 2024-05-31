const path = require("path");
const pool = require("../utils/db");
const { getAll, getById, create, deleteById } = require("./genericControler");

const BASE_TABLE = "deductions";

const deductionsController = {
  getAll: (req, res) => getAll(req, res, BASE_TABLE),
  getById: (req, res) => getById(req, res, BASE_TABLE),
  create: async (req, res) => {
    const { image_url, id, deleted, ...data } = req.body;
    const { filename } = req.file || {};

    data["user_id"] = 1; // TODO: replace with authenticated user id

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
  updateById: async (req, res) => {
    const deductionId = req.params.id;
    const { image_url, id, deleted, ...data } = req.body;
    const { filename } = req.file || {};

    data["user_id"] = 1; // TODO: replace with authenticated user id

    try {
      let [result] = await pool.query(
        `UPDATE "${BASE_TABLE}" SET ${Object.keys(data)
          .map((key) => `${key} = $${Object.keys(data).indexOf(key) + 1}`)
          .join(", ")} WHERE id = $${
          Object.keys(data).length + 1
        } AND deleted IS false RETURNING *`,
        [...Object.values(data), deductionId]
      );

      if (req.file) {
        if (result.image_url) {
          const existingFilePath = path.join(
            __dirname,
            "..",
            result.image_url.replace("/api/deductions/", "")
          );
          fs.unlink(existingFilePath, (err) => {
            if (err) {
              console.error("Error deleting existing file:", err);
            }
          });
        }

        [result] = await pool.query(
          `UPDATE "${BASE_TABLE}" SET image_url = $1 WHERE id = $2 AND deleted IS false RETURNING *`,
          [`/api/deductions/${result.id}/attachments/${filename}`, result.id]
        );
      }

      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.toString() });
    }
  },
  deleteById: (req, res) => deleteById(req, res, BASE_TABLE),
  attachment: (req, res) => {
    const { filename, id } = req.params;

    res.sendFile(path.resolve(`uploads/deductions/${filename}`));
  },
};

module.exports = deductionsController;
