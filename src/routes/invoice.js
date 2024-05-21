const express = require("express");
const invoiceRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/invoice");

invoiceRouter.get("/:id", getById);
invoiceRouter.get("/", getAll);
invoiceRouter.post("/", create);
invoiceRouter.put("/:id", updateById);
invoiceRouter.delete("/:id", deleteById);

module.exports = invoiceRouter;
