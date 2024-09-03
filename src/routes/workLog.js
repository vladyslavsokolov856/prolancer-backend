const express = require("express");
const workLogRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/workLog");
const authorizationMiddleware = require("../middlewares/authorization");
const BASE_TABLE = "work_logs";
workLogRouter.get("/:id", authorizationMiddleware(BASE_TABLE), getById);
workLogRouter.get("/", getAll);
workLogRouter.post("/", authorizationMiddleware(BASE_TABLE), create);
workLogRouter.put("/:id", authorizationMiddleware(BASE_TABLE), updateById);
workLogRouter.delete("/:id", authorizationMiddleware(BASE_TABLE), deleteById);

module.exports = workLogRouter;
