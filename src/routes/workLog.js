const express = require("express");
const workLogRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/workLog");

workLogRouter.get("/:id", getById);
workLogRouter.get("/", getAll);
workLogRouter.post("/", create);
workLogRouter.put("/:id", updateById);
workLogRouter.delete("/:id", deleteById);

module.exports = workLogRouter;
