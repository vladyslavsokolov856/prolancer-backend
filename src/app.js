const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const pool = require("./utils/db");
const apiRouter = require("./routes");
// const passportConfig = require("./utils/passport");
const zitadelAuth = require("./utils/zitadel-auth");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

zitadelAuth(app);

// passportConfig(app);

app.use("/api", apiRouter);

app.listen(port, async () => {
  pool.query("SELECT 1 + 1 AS result", (err, res) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      process.exit(1);
    } else {
      console.log("Database connection established!");
    }
  });

  console.log(`Server is running on port ${port}`);
});
