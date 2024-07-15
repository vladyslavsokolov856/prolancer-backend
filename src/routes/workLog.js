const express = require("express");
const workLogRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/workLog");
const authenticateToken = require("../middlewares/authentication");

workLogRouter.get("/:id", authenticateToken, getById);
workLogRouter.get("/", authenticateToken, getAll);
workLogRouter.post("/", authenticateToken, create);
workLogRouter.put("/:id", authenticateToken, updateById);
workLogRouter.delete("/:id", authenticateToken, deleteById);

module.exports = workLogRouter;
