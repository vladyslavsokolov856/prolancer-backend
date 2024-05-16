const express = require("express");
const apiRouter = express.Router();
const customerRouter = require("./customer");

apiRouter.use("/customers", customerRouter);

module.exports = apiRouter;
