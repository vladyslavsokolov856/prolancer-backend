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
        `
        SELECT 
          t.*, 
          c.name_contact_person,
          c.email_contact_person,
          c.phone_contact_person,
          c.address,
          c.city,
          c.postal_code
        FROM tasks t
        JOIN customers c ON t.customer_id = c.id
        WHERE t.identifier = '${identifier}' AND t.deleted IS false
        `
      );
      if (result.length > 0) {
        const task = result[0];
        const customer = {
          name_contact_person: task.name_contact_person,
          email_contact_person: task.email_contact_person,
          phone_contact_person: task.phone_contact_person,
          address: task.address,
          city: task.city,
          postal_code: task.postal_code,
        };

        delete task.name_contact_person;
        delete task.email_contact_person;
        delete task.phone_contact_person;
        delete task.address;
        delete task.city;
        delete task.postal_code;

        res.json({ ...task, customer });
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
