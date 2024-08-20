const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const pool = require("./utils/db");
const apiRouter = require("./routes");
const passport = require("passport");
const { ZitadelIntrospectionStrategy } = require("passport-zitadel");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

passport.use(
  new ZitadelIntrospectionStrategy({
    authority: process.env.ZITADEL_AUTHORITY,
    authorization: {
      type: "jwt-profile",
      profile: {
        type: "application",
        keyId: process.env.ZITADEL_KEY_ID,
        key: process.env.ZITADEL_KEY,
        appId: process.env.ZITADEL_APP_ID,
        clientId: process.env.ZITADEL_CLIENT_ID,
      },
    },
  })
);

// app.use(passport.initialize());

// app.use(passport.authenticate("zitadel-introspection", { session: false }));

app.use("/api", apiRouter);

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
