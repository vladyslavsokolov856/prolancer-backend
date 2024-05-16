const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./utils/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.detail });
  }
});

app.listen(port, async () => {
  pool.query("SELECT 1 + 1 AS result", (err, res) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      process.exit(1);
    } else {
      console.log("Database connection established");
    }
  });

  console.log(`Server is running on port ${port}`);
});
