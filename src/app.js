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
    authority: "http://prolancer-authentication-ebcf8a4aae1e.herokuapp.com/",
    authorization: {
      type: "jwt-profile",
      profile: {
        type: "application",
        clientId: "275389987892098434@prolancer",
      },
    },
  })
);

app.use(passport.initialize());

app.use(passport.authenticate("zitadel-introspection", { session: false }));

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
