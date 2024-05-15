const express = require("express");
const sequelize = require("./utils/db");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

  try {
    await sequelize.authenticate();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
