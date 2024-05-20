const express = require("express");
const apiRouter = express.Router();
const customerRouter = require("./customer");
const userRouter = require("./user");

apiRouter.use("/customers", customerRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;
