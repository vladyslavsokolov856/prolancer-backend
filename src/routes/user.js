const express = require("express");
const userRouter = express();
const {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
} = require("../controllers/user");

userRouter.get("/:id", getById);
userRouter.get("/", getAll);
userRouter.post("/", create);
userRouter.put("/:id", updateById);
userRouter.delete("/:id", deleteById);

module.exports = userRouter;
