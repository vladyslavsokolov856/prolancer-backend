const express = require("express");
const apiRouter = express.Router();
const customerRouter = require("./customer");
const userRouter = require("./user");
const invoiceRouter = require("./invoice");
const workLogRouter = require("./workLog");
const taskRouter = require("./task");
const jobTypeRouter = require("./jobType");
const orderLinesRouter = require("./orderLine");

apiRouter.use("/customers", customerRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/invoices", invoiceRouter);
apiRouter.use("/work-logs", workLogRouter);
apiRouter.use("/tasks", taskRouter);
apiRouter.use("/job-types", jobTypeRouter);
apiRouter.use("/order-lines", orderLinesRouter);

module.exports = apiRouter;
