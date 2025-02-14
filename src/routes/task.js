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
const authorizationMiddleware = require("../middlewares/authorization");
const taskValidators = require("../validators/tasks");

const BASE_TABLE = "tasks";

taskRouter.get("/", getAll);
taskRouter.post("/", taskValidators, create);
taskRouter.post("/details", getByTaskIdentifier);
taskRouter.get("/:id", authorizationMiddleware(BASE_TABLE), getById);
taskRouter.put("/:id", taskValidators, authorizationMiddleware(BASE_TABLE), updateById);
taskRouter.delete("/:id", authorizationMiddleware(BASE_TABLE), deleteById);

module.exports = taskRouter;
