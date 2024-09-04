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
customerRouter.use(authorizationMiddleware(BASE_TABLE))
customerRouter.get("/:id", getById);
customerRouter.put("/:id", updateById);
customerRouter.delete("/:id", deleteById);

module.exports = customerRouter;
