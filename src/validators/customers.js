const { body } = require("express-validator");

const isStringOrNumber = (value) => {
  if (typeof value === "string" || typeof value === "number") {
    return true;
  }
  throw new Error("Value must be either a string or a number.");
};

const customerValidators = [
  body("country")
    .isLength({ max: 2, min: 2 })
    .withMessage("Country code must be exactly 2 characters."),
  body("type")
    .isIn(["private", "organization"])
    .withMessage('Type must be either "private" or "organization".'),
  body("language")
    .isIn(["Danish", "English"])
    .withMessage('Language must be either "Danish" or "English".'),
  body("name_contact_person")
    .isLength({ min: 1 })
    .withMessage("Contact person name is required."),
  body("email_contact_person").isEmail().withMessage("Invalid email format."),
  body("phone_contact_person")
    .custom(isStringOrNumber)
    .trim()
    .matches(/^[0-9]{10,15}$/)
    .withMessage("Phone number must be between 10 and 15 digits.")
    .customSanitizer((value) => value.replace(/\D/g, "")),
  body("address").isString(),
  body("city").isString().withMessage("City must be a string."),
  body("postal_code")
    .custom(isStringOrNumber)
    .customSanitizer((value) =>
      typeof value === "string" ? value.replace(/\D/g, "") : value
    ),
  body("payment_due_days")
    .optional({ nullable: true })
    .custom(isStringOrNumber)
    .customSanitizer((value) =>
      value
        ? typeof value === "string"
          ? value.replace(/\D/g, "")
          : value
        : null
    ),
  body("company_id")
    .optional()
    .custom(isStringOrNumber)
    .customSanitizer((value) =>
      value
        ? typeof value === "string"
          ? value.replace(/\D/g, "")
          : value
        : null
    ),
  body("ean")
    .optional()
    .custom(isStringOrNumber)
    .customSanitizer((value) =>
      value
        ? typeof value === "string"
          ? value.replace(/\D/g, "")
          : value
        : null
    ),
];

module.exports = customerValidators;
