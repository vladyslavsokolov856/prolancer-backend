const pool = require("../utils/db");
const authorizationMiddleware = (tableName) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;
      const userId = req.user.id;
      const queryText = `SELECT * FROM ${tableName} WHERE id = $1 AND user_id = $2`;
      const queryValues = [resourceId, userId];
      const result = await pool.query(queryText, queryValues);
      if (result.length === 0) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = authorizationMiddleware;
