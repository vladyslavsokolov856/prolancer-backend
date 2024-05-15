const express = require("express");
const sequelize = require("./utils/db");
const bodyParser = require("body-parser");
const User = require("./models/User");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "phone", "first_name", "last_name"],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

  try {
    await sequelize.authenticate();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
