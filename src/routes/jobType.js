const express = require("express");
const jobTypesRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/jobType");
const authenticateToken = require("../middlewares/authentication");

jobTypesRouter.get("/:id", authenticateToken, getById);
jobTypesRouter.get("/", authenticateToken, getAll);
jobTypesRouter.post("/", authenticateToken, create);
jobTypesRouter.put("/:id", authenticateToken, updateById);
jobTypesRouter.delete("/:id", authenticateToken, deleteById);

module.exports = jobTypesRouter;
