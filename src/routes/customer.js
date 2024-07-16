const express = require("express");
const customerRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/customer");

customerRouter.get("/:id", getById);
customerRouter.get("/", getAll);
customerRouter.post("/", create);
customerRouter.put("/:id", updateById);
customerRouter.delete("/:id", deleteById);

module.exports = customerRouter;
