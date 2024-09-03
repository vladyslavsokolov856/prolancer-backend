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
const BASE_TABLE = "deductions";
deductionRouter.get("/:id", authorizationMiddleware(BASE_TABLE), getById);
deductionRouter.get("/", getAll);
deductionRouter.post("/", upload.single("attachment"), create);
deductionRouter.put("/:id", authorizationMiddleware(BASE_TABLE), upload.single("attachment"), updateById);
deductionRouter.delete("/:id", authorizationMiddleware(BASE_TABLE), deleteById);
deductionRouter.get("/:id/attachments/:filename", attachment);

module.exports = deductionRouter;
