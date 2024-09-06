const express = require("express");
const customerRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/customer");
const authorizationMiddleware = require("../middlewares/authorization");

const BASE_TABLE = "customers";
customerRouter.get("/", getAll);
customerRouter.post("/", create);
customerRouter.get("/:id", authorizationMiddleware(BASE_TABLE), getById);
customerRouter.put("/:id", authorizationMiddleware(BASE_TABLE), updateById);
customerRouter.delete("/:id", authorizationMiddleware(BASE_TABLE), deleteById);

module.exports = customerRouter;
