const { body } = require("express-validator");

const deductionValidators = [
  body("task_id")
  .isString()
  .customSanitizer((value) => value.replace(/\D/g, "") || null)
  .withMessage('Task must be required.'),
  body("description")
    .isString()
    .withMessage('Description must be required.'),
  body('currency')
    .isLength({ min: 1 })
    .withMessage('Currency must be required.')
    .isLength({ max: 3 })
    .withMessage('Currency must be a valid string.')
    .trim()
    .customSanitizer((value) => value.toUpperCase()),
  body('amount')
    .isLength({ min: 1 })
    .withMessage('Payment amount must be required.')
    .isString()
    .customSanitizer(value => {
      const sanitizedValue = value.replace(/\D/g, '');
      return sanitizedValue ? Number(sanitizedValue) : null;
    })
    .isNumeric()
    .withMessage('amount must be a numeric value.'),
  body('include_vat')
    .optional({ nullable: true })
    .isBoolean()
    .withMessage('show_customer_price must be a boolean value.'),
  body('attachment')
    .optional({ nullable: true })
    .custom((value, { req }) => {
        if (req.file && !['image/jpeg', 'image/png', 'application/pdf'].includes(req.file.mimetype)) {
            throw new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.');
        }
        return true;
    })
];

module.exports = deductionValidators;
