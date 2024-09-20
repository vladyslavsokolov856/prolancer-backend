const { body } = require("express-validator");

const mileageValidators = [
  body('has_agreed_terms')
  .notEmpty()
  .withMessage('has_agreed_terms is required')
  .isBoolean()
  .withMessage('has_agreed_terms must be a boolean value.'),
  body('attachment')
  .notEmpty()
  .withMessage('Attachment is required')
  .custom((value, { req }) => {
    if(!req.file) {
      throw new Error('Attachment is required');
    }
    if (req.file && !['image/png', 'image/jpeg', 'application/pdf'].includes(req.file.mimetype)) {
      throw new Error('Invalid file type. Only PNG, JPEG and PDF files are allowed.');
    }
    return true;
  })
];

module.exports = mileageValidators;