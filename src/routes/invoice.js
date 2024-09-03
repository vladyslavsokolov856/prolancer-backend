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
BASE_TABLE = "invoices";  
invoiceRouter.get("/:id", authorizationMiddleware(BASE_TABLE), getById);
invoiceRouter.get("/", getAll);
invoiceRouter.post("/", create);
invoiceRouter.put("/:id", authorizationMiddleware(BASE_TABLE), updateById);
invoiceRouter.delete("/:id", authorizationMiddleware(BASE_TABLE), deleteById);

module.exports = invoiceRouter;
