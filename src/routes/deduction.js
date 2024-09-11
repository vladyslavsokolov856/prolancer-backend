const express = require("express");
const deductionRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  attachment,
} = require("../controllers/deduction");
const upload = require("../utils/storage");
const authorizationMiddleware = require("../middlewares/authorization");
const deductionValidators = require("../validators/deductions");


const BASE_TABLE = "deductions";

deductionRouter.get("/", getAll);
deductionRouter.get("/:id/attachments/:filename", attachment);
deductionRouter.post("/", upload.single("attachment"), deductionValidators, create);
deductionRouter.get("/:id", authorizationMiddleware(BASE_TABLE), getById);
deductionRouter.put("/:id", authorizationMiddleware(BASE_TABLE), upload.single("attachment"), deductionValidators, updateById);
deductionRouter.delete("/:id", authorizationMiddleware(BASE_TABLE), deleteById);

module.exports = deductionRouter;
