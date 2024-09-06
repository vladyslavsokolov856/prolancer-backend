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
invoiceRouter.get("/:id", authorizationMiddleware(BASE_TABLE), getById);
invoiceRouter.put("/:id", authorizationMiddleware(BASE_TABLE), updateById);
invoiceRouter.delete("/:id", authorizationMiddleware(BASE_TABLE), deleteById);

module.exports = invoiceRouter;
