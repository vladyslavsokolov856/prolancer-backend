const express = require("express");
const customerRouter = express();
const { body, validationResult } = require("express-validator");
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/customer");
const authorizationMiddleware = require("../middlewares/authorization");
const customerValidators = require("../validators/customers");

const BASE_TABLE = "customers";
customerRouter.get("/", getAll);
customerRouter.post("/", customerValidators, create);
customerRouter.get("/:id", authorizationMiddleware(BASE_TABLE), getById);
customerRouter.put(
  "/:id",
  customerValidators,
  authorizationMiddleware(BASE_TABLE),
  updateById
);
customerRouter.delete("/:id", authorizationMiddleware(BASE_TABLE), deleteById);

module.exports = customerRouter;
