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
userRouter.use(authorizationMiddleware(BASE_TABLE))
userRouter.get("/:id", getById);
userRouter.put("/:id", updateById);
userRouter.delete("/:id", deleteById);

module.exports = userRouter;
