const path = require("path");
const pool = require("../utils/db");
const { attachment } = require("./deduction");
const { getAll, create } = require("./genericControler");
const { validationResult } = require("express-validator")

const BASE_TABLE = "mileages";

const mileageController = {
  get: async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${BASE_TABLE} where user_id = ${req.user.id}`);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },
  create: async (req, res) => {
    
    const errors = validationResult(req.body);
    
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {attachment_url, ...data} = req.body;

    if(!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const {filename} = req.file;

    data["user_id"] = req?.user?.id || 69; // TODO: replace with authenticated user id

     // Default status to sent if not provided
     if (!data.status) {
      data.status = "sent";
    }

    data["created_at"] = new Date();

    const fields = Object.keys(data).join(", ");
    const values = Object.values(data)
      .map((_, i) => `$${i + 1}`)
      .join(", ");

    try {
      let [result] = await pool.query(`INSERT INTO ${BASE_TABLE} (${fields}) VALUES (${values}) RETURNING *`, Object.values(data));
      
      [result] = await pool.query(
        `UPDATE "${BASE_TABLE}" SET attachment_url = $1 WHERE id = $2 RETURNING *`,
        [`/api/mileages/${result.id}/attachments/${filename}`, result.id]
      );

      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },
  attachment: (req, res) => {
    const { filename, id } = req.params;

    res.sendFile(path.resolve(`uploads/mileages/${filename}`));
  },
}

module.exports = mileageController;