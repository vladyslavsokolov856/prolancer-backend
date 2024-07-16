const express = require("express");
const jobTypesRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/jobType");

jobTypesRouter.get("/:id", getById);
jobTypesRouter.get("/", getAll);
jobTypesRouter.post("/", create);
jobTypesRouter.put("/:id", updateById);
jobTypesRouter.delete("/:id", deleteById);

module.exports = jobTypesRouter;
