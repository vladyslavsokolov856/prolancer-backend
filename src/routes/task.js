const express = require("express");
const taskRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/task");

taskRouter.get("/:id", getById);
taskRouter.get("/", getAll);
taskRouter.post("/", create);
taskRouter.put("/:id", updateById);
taskRouter.delete("/:id", deleteById);

module.exports = taskRouter;
