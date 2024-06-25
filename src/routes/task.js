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

taskRouter.get("/:id", getById);
taskRouter.get("/", getAll);
taskRouter.post("/", create);
taskRouter.put("/:id", updateById);
taskRouter.delete("/:id", deleteById);
taskRouter.post("/details", getByTaskIdentifier);

module.exports = taskRouter;
