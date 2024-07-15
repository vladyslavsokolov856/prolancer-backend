const express = require("express");
const customerRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/customer");
const authenticateToken = require("../middlewares/authentication");

customerRouter.get("/:id", authenticateToken, getById);
customerRouter.get("/", authenticateToken, getAll);
customerRouter.post("/", authenticateToken, create);
customerRouter.put("/:id", authenticateToken, updateById);
customerRouter.delete("/:id", authenticateToken, deleteById);

module.exports = customerRouter;
