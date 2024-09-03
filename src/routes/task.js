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
taskRouter.get("/:id", authorizationMiddleware(BASE_TABLE), getById);
taskRouter.get("/", getAll);
taskRouter.post("/", create);
taskRouter.put("/:id", authorizationMiddleware(BASE_TABLE), updateById);
taskRouter.delete("/:id", authorizationMiddleware(BASE_TABLE), deleteById);
taskRouter.post("/details", getByTaskIdentifier);
module.exports = taskRouter;
