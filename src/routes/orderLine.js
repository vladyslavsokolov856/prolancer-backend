const express = require("express");
const orderLinesRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/orderLine");
const authenticateToken = require("../middlewares/authentication");

orderLinesRouter.get("/:id", authenticateToken, getById);
orderLinesRouter.get("/", authenticateToken, getAll);
orderLinesRouter.post("/", authenticateToken, create);
orderLinesRouter.put("/:id", authenticateToken, updateById);
orderLinesRouter.delete("/:id", authenticateToken, deleteById);

module.exports = orderLinesRouter;
