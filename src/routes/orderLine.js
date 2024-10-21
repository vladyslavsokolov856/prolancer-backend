const express = require("express");
const orderLinesRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getInvoiceById,
} = require("../controllers/orderLine");

orderLinesRouter.get("/:id", getById);
orderLinesRouter.get("/", getAll);
orderLinesRouter.post("/", create);
orderLinesRouter.put("/:id", updateById);
orderLinesRouter.delete("/:id", deleteById);
orderLinesRouter.get("/invoice/:id", getInvoiceById);

module.exports = orderLinesRouter;
