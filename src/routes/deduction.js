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
const authenticateToken = require("../middlewares/authentication");

deductionRouter.get("/:id", authenticateToken, getById);
deductionRouter.get("/", authenticateToken, getAll);
deductionRouter.post("/", upload.single("attachment"), create);
deductionRouter.put("/:id", upload.single("attachment"), updateById);
deductionRouter.delete("/:id", authenticateToken, deleteById);
deductionRouter.get(
  "/:id/attachments/:filename",
  authenticateToken,
  attachment
);

module.exports = deductionRouter;
