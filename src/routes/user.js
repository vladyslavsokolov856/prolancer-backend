const express = require("express");
const userRouter = express();
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/user");
const authenticateToken = require("../middlewares/authentication");

userRouter.get("/:id", authenticateToken, getById);
userRouter.get("/", authenticateToken, getAll);
userRouter.post("/", authenticateToken, create);
userRouter.put("/:id", authenticateToken, updateById);
userRouter.delete("/:id", authenticateToken, deleteById);

module.exports = userRouter;
