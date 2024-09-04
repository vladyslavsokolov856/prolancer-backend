const express = require("express");
const userRouter = express();
const {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
} = require("../controllers/user");
const authorizationMiddleware = require("../middlewares/authorization");
const BASE_TABLE = "users";

userRouter.get("/", getAll);
userRouter.post("/", create);
userRouter.get("/:id", authorizationMiddleware(BASE_TABLE), getById);
userRouter.put("/:id", authorizationMiddleware(BASE_TABLE), updateById);
userRouter.delete("/:id", authorizationMiddleware(BASE_TABLE), deleteById);

module.exports = userRouter;
