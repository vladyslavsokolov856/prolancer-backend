const { body } = require("express-validator");

const taskValidators = [
  body("allow_mileages")
    .optional({ nullable: true })
    .isBoolean()
    .withMessage('allow_mileages must be a boolean value.'),
  body("archived")
    .isBoolean()
    .withMessage('archived must be a boolean value.'),
  body('currency')
    .isString()
    .withMessage('currency must be a string.')
    .trim()
    .customSanitizer((value) => value.toUpperCase()),
  body('customer_id')
    .isInt({ min: 1 })
    .withMessage('customer_id must be a positive integer.'),
  body('customer_message')
    .optional()
    .isString()
    .withMessage('customer_message must be a string.'),
  body('deleted')
    .isBoolean()
    .withMessage('deleted must be a boolean value.'),
  body('description')
    .optional()
    .isString()
    .withMessage('description must be a string.'),
  body('end_date')
    .isISO8601()
    .withMessage('end_date must be a valid ISO 8601 date.'),
  body('expected_minutes')
    .isInt({ min: 0 })
    .withMessage('expected_minutes must be a non-negative integer.'),
    body('id')
    .isInt({ min: 1 })
    .withMessage('id must be a positive integer.'),
  body('identifier')
    .isUUID()
    .customSanitizer((value) => value.replace(/\D/g, ""))
    .withMessage('identifier must be a valid UUID.'),
  body('is_retainer')
    .isBoolean()
    .optional({ nullable: true })
    .withMessage('is_retainer must be a boolean value.'),
  body('job_type_id')
    .isInt({ min: 1 })
    .withMessage('job_type_id must be a positive integer.'),
  body('minutes_spent')
    .optional({ nullable: true })
    .isInt({ min: 0 })
    .withMessage('minutes_spent must be a non-negative integer if provided.'),
  body('offer_id')
    .optional({ nullable: true })
    .isInt()
    .customSanitizer((value) => value.replace(/\D/g, "") || null)
    .withMessage('offer_id must be an integer.'),
  body('payment_amount')
    .isNumeric()
    .withMessage('payment_amount must be a numeric value.')
    .customSanitizer((value) => value.replace(/[^\d.]/g, "")),
  body('payment_term')
    .isString()
    .isIn(["current_month", "ongoing_week", "other", "task_end"])
    .withMessage('payment_term must be a string.'),
  body('payment_term_days')
    .isInt({ min: 0 })
    .withMessage('payment_term_days must be a non-negative integer.'),
  body('payment_term_other')
    .optional({ nullable: true })
    .isString()
    .withMessage('payment_term_other must be a string.'),
  body('payment_type')
    .isString()
    .isIn(["per_day", "per_hour", "project_price"])
    .withMessage('payment_type must be a string.'),
  body('purchase_order_number')
    .optional()
    .isString()
    .withMessage('purchase_order_number must be a string.'),
  body('reference')
    .optional()
    .isString()
    .withMessage('reference must be a string.'),
  body('request_allow_mileages')
    .isBoolean()
    .withMessage('request_allow_mileages must be a boolean value.'),
  body('requested_changes')
    .optional({ nullable: true })
    .isString()
    .withMessage('requested_changes must be a string.'),
  body('show_customer_price')
    .isBoolean()
    .optional({ nullable: true })
    .withMessage('show_customer_price must be a boolean value.'),
  body('start_date')
    .isISO8601()
    .withMessage('start_date must be a valid ISO 8601 date.'),
  body('status')
    .isString()
    .withMessage('status must be a string.'),
  body('terms_accepted')
    .isBoolean()
    .withMessage('terms_accepted must be a boolean value.'),
  body('title')
    .isString()
    .trim() 
    .withMessage('title must be a string.'),
  body('user_id')
    .isInt({ min: 1 })
    .withMessage('user_id must be a positive integer.'),
];

module.exports = taskValidators;
