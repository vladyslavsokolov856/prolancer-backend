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
const workLogValidators = require("../validators/workLog");
const BASE_TABLE = "work_logs";


workLogRouter.get("/", getAll);
workLogRouter.post("/", workLogValidators, create);
workLogRouter.get("/:id", authorizationMiddleware(BASE_TABLE), getById);
workLogRouter.put("/:id", workLogValidators, authorizationMiddleware(BASE_TABLE), updateById);
workLogRouter.delete("/:id", authorizationMiddleware(BASE_TABLE), deleteById);

module.exports = workLogRouter;
