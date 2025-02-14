const pool = require("../utils/db");
const {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
} = require("./genericControler");

const BASE_TABLE = "users";

const usersController = {
    getAll: (req, res) => getAll(req, res, BASE_TABLE),
    getById: (req, res) => getById(req, res, BASE_TABLE),
    create: (req, res) => create(req, res, BASE_TABLE),
    updateById: (req, res) => updateById(req, res, BASE_TABLE),
    deleteById: (req, res) => deleteById(req, res, BASE_TABLE),
    getUser: (req, res) => {
        return res.status(200).json(req.user)
    },
};

module.exports = usersController;
