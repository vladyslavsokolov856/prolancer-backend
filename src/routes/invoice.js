const express = require("express");
const invoiceRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/invoice");
const authenticateToken = require("../middlewares/authentication");

invoiceRouter.get("/:id", authenticateToken, getById);
invoiceRouter.get("/", authenticateToken, getAll);
invoiceRouter.post("/", authenticateToken, create);
invoiceRouter.put("/:id", authenticateToken, updateById);
invoiceRouter.delete("/:id", authenticateToken, deleteById);

module.exports = invoiceRouter;
