const { body } = require("express-validator");

const taskValidators = [
  body("request_allow_mileages")
    .optional({ nullable: true })
    .isBoolean()
    .withMessage("allow_mileages must be a boolean value."),
  body("currency")
    .isLength({ min: 1 })
    .withMessage("Currency must be required.")
    .isLength({ max: 3 })
    .withMessage("Currency must be a valid string.")
    .trim()
    .customSanitizer((value) => value.toUpperCase()),
  body("customer_id")
    .isLength({ min: 1 })
    .withMessage("Customer must be required.")
    .isString()
    .customSanitizer((value) => {
      return parseInt(`${value}`.replace(/\D/g, ""), 10);
    })
    .isInt()
    .withMessage("customer_id must be a valid integer"),
  body("customer_message")
    .isLength({ min: 1 })
    .withMessage("Customer message must be required.")
    .isString()
    .withMessage("customer_message must be a string."),
  body("deleted").isBoolean().withMessage("deleted must be a boolean value."),
  body("description")
    .isLength({ min: 1 })
    .withMessage("Description must be required.")
    .isString()
    .withMessage("description must be a string."),
  body("end_date")
    .isLength({ min: 1 })
    .withMessage("End date must be required.")
    .isString()
    .customSanitizer((value) => {
      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0];
    })
    .isISO8601()
    .withMessage("End date must be a valid date"),
  body("expected_minutes")
    .isLength({ min: 1 })
    .withMessage("Expected minutes must be required.")
    .isString()
    .customSanitizer((value) => {
      return parseInt(value.replace(/\D/g, ""), 10);
    })
    .isInt()
    .withMessage("expected_minutes must be a valid integer"),
  body("is_retainer")
    .optional({ nullable: true })
    .isBoolean()
    .withMessage("Retainer must be a boolean value."),
  body("job_type_id")
    .isLength({ min: 1 })
    .withMessage("Job type must be required.")
    .isString()
    .customSanitizer((value) => {
      return parseInt(`${value}`.replace(/\D/g, ""), 10);
    })
    .isInt()
    .withMessage("job_type_id must be a valid integer"),
  body("payment_amount")
    .isLength({ min: 1 })
    .withMessage("Payment amount must be required.")
    .isString()
    .customSanitizer((value) => {
      const sanitizedValue = value.replace(/\D/g, "");
      return sanitizedValue ? Number(sanitizedValue) : null;
    })
    .isNumeric()
    .withMessage("payment_amount must be a numeric value."),
  body("payment_term")
    .isString()
    .isIn(["current_month", "ongoing_week", "other", "task_end"])
    .withMessage(
      'payment_term must be either "Current month" or "Ongoing week", "Other", "Task end".'
    ),
  body("payment_term_days")
    .isLength({ min: 1 })
    .withMessage("Payment term days must be required.")
    .isString()
    .customSanitizer((value) => {
      return parseInt(value.replace(/\D/g, ""), 10);
    })
    .isInt()
    .withMessage("payment_term_days must be a valid integer"),
  body("payment_type")
    .isString()
    .isIn(["per_day", "per_hour", "project_price"])
    .withMessage(
      'payment_type must be either "Per day" or "Per hour", "Project price".'
    ),
  body("purchase_order_number")
    .optional({ nullable: true })
    .isString()
    .withMessage("PO number must be a string."),
  body("reference")
    .optional({ nullable: true })
    .isString()
    .withMessage("reference must be a string."),
  body("show_customer_price")
    .optional({ nullable: true })
    .isBoolean()
    .withMessage("show_customer_price must be a boolean value."),
  body("start_date")
    .isLength({ min: 1 })
    .withMessage("Start date must be required.")
    .isString()
    .customSanitizer((value) => {
      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0];
    })
    .isISO8601()
    .withMessage("Start date must be a valid date"),
  body("status")
    .isIn(["sent", "draft"])
    .withMessage('status must be either "sent" or "draft".'),
  body("title")
    .isLength({ min: 1 })
    .withMessage("title is required.")
    .isString()
    .withMessage("title must be a string.")
    .trim(),
];

module.exports = taskValidators;
