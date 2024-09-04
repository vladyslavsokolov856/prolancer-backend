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


workLogRouter.get("/", getAll);
workLogRouter.post("/",  create);
workLogRouter.use(authorizationMiddleware(BASE_TABLE))
workLogRouter.get("/:id", getById);
workLogRouter.put("/:id", updateById);
workLogRouter.delete("/:id", deleteById);

module.exports = workLogRouter;
