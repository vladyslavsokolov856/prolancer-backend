const express = require("express");
const userRouter = express();
const {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
    getUser,
} = require("../controllers/user");

userRouter.get("/", getAll);
userRouter.post("/", create);
userRouter.get("/me", getUser)
userRouter.get("/:id", getById);
userRouter.put("/:id", updateById);
userRouter.delete("/:id", deleteById);

module.exports = userRouter;
