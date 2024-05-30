const express = require("express");
const deductionRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/deduction");
const upload = require("../utils/storage");

deductionRouter.get("/:id", getById);
deductionRouter.get("/", getAll);
deductionRouter.post("/", upload.single("attachment"), create);
deductionRouter.put("/:id", updateById);
deductionRouter.delete("/:id", deleteById);

module.exports = deductionRouter;
