const { body } = require("express-validator");

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
    .isString()
    .trim()
    .matches(/^[0-9]{10,15}$/)
    .withMessage("Phone number must be between 10 and 15 digits.")
    .customSanitizer((value) => value.replace(/\D/g, "")),
  body("address").isString(),
  body("city").isString().withMessage("City must be a string."),
  body("postal_code")
    .isString()
    .customSanitizer((value) => value.replace(/\D/g, "")),
  body("payment_due_days")
    .optional({ nullable: true })
    .isString()
    .customSanitizer((value) => value.replace(/\D/g, "") || null),
  body("company_id")
    .optional()
    .isString()
    .customSanitizer((value) => value.replace(/\D/g, "") || null),
  body("ean")
    .optional()
    .isString()
    .customSanitizer((value) => value.replace(/\D/g, "") || null),
];

module.exports = customerValidators;
