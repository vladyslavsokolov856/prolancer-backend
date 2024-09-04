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

deductionRouter.get("/", getAll);
deductionRouter.get("/:id/attachments/:filename", attachment);
deductionRouter.post("/", upload.single("attachment"), create);
deductionRouter.use(authorizationMiddleware(BASE_TABLE))
deductionRouter.get("/:id", getById);
deductionRouter.put("/:id", upload.single("attachment"), updateById);
deductionRouter.delete("/:id", deleteById);

module.exports = deductionRouter;
