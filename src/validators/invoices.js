const { body } = require("express-validator");

const isAllDigits = (value) => {
  if (!/^\d+$/.test(value)) {
    throw new Error("The value must contain only digits.");
  }
  return true;
};

const invoiceValidators = [
  body("customer_id")
    .isLength({ min: 1 })
    .withMessage("Customer must be required.")
    .isString()
    .customSanitizer((value) => {
      return parseInt(`${value}`.replace(/\D/g, ""), 10);
    })
    .isInt()
    .withMessage("customer_id must be a valid integer"),
  body("task_id")
    .isLength({ min: 1 })
    .withMessage("Task must be required.")
    .isString()
    .customSanitizer((value) => {
      return parseInt(`${value}`.replace(/\D/g, ""), 10);
    })
    .isInt()
    .withMessage("task_id must be a valid integer"),
  body("hours_worked")
    .isLength({ min: 1 })
    .withMessage("Hours worked must be required.")
    .isString()
    .customSanitizer((value) => {
      return parseInt(`${value}`.replace(/\D/g, ""), 10);
    })
    .isInt()
    .withMessage("hours_worked must be a valid integer"),
  body("payment_days")
    .isLength({ min: 1 })
    .withMessage("Payment days must be required.")
    .isString()
    .customSanitizer((value) => {
      return parseInt(`${value}`.replace(/\D/g, ""), 10);
    })
    .isInt()
    .withMessage("payment_days must be a valid integer"),
  body("invoice_date")
    .isLength({ min: 1 })
    .withMessage("Invoice date must be required.")
    .isString()
    .customSanitizer((value) => {
      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0];
    })
    .isISO8601()
    .withMessage("Invoice date must be a valid date"),
];

module.exports = invoiceValidators;
