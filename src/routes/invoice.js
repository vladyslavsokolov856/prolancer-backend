const express = require("express");
const invoiceRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/invoice");
const authorizationMiddleware = require("../middlewares/authorization");

const BASE_TABLE = "invoices";

invoiceRouter.get("/", getAll);
invoiceRouter.post("/", create);
invoiceRouter.use(authorizationMiddleware(BASE_TABLE))
invoiceRouter.get("/:id", getById);
invoiceRouter.put("/:id", updateById);
invoiceRouter.delete("/:id", deleteById);

module.exports = invoiceRouter;
