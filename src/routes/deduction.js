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

deductionRouter.get("/:id", getById);
deductionRouter.get("/", getAll);
deductionRouter.post("/", upload.single("attachment"), create);
deductionRouter.put("/:id", upload.single("attachment"), updateById);
deductionRouter.delete("/:id", deleteById);
deductionRouter.get("/:id/attachments/:filename", attachment);

module.exports = deductionRouter;
