const express = require("express");
const orderLinesRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/orderLine");

orderLinesRouter.get("/:id", getById);
orderLinesRouter.get("/", getAll);
orderLinesRouter.post("/", create);
orderLinesRouter.put("/:id", updateById);
orderLinesRouter.delete("/:id", deleteById);

module.exports = orderLinesRouter;
