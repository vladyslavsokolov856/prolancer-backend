const express = require("express");
const mileageRouter = express();
const {
  get,
  create,
  attachment,
} = require("../controllers/mileage");

const upload = require("../utils/storage");
const mileageValidators = require("../validators/mileage");


mileageRouter.get("/", get);
mileageRouter.get("/:id/attachments/:filename", attachment);
mileageRouter.post("/", upload.single("attachment"), mileageValidators, create);

module.exports = mileageRouter;
