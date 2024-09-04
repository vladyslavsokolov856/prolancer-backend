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

const BASE_TABLE = "tasks";

taskRouter.get("/", getAll);
taskRouter.post("/", create);
taskRouter.post("/details", getByTaskIdentifier);
taskRouter.use(authorizationMiddleware(BASE_TABLE))
taskRouter.get("/:id", getById);
taskRouter.put("/:id", updateById);
taskRouter.delete("/:id", deleteById);

module.exports = taskRouter;
