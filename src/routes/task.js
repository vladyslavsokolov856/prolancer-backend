const express = require("express");
const taskRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByTaskIdentifier,
} = require("../controllers/task");
const authenticateToken = require("../middlewares/authentication");

taskRouter.get("/:id", authenticateToken, getById);
taskRouter.get("/", authenticateToken, getAll);
taskRouter.post("/", authenticateToken, create);
taskRouter.put("/:id", authenticateToken, updateById);
taskRouter.delete("/:id", authenticateToken, deleteById);
taskRouter.post("/details", authenticateToken, getByTaskIdentifier);

module.exports = taskRouter;
