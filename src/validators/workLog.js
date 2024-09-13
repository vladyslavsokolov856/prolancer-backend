const { body } = require("express-validator");

const workLogValidators = [
    body('notes')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Notes are required.')
        .isString()
        .withMessage('Notes must be a string.')
        .escape(),

    body('status')
        .isIn(["sent", "draft"])
        .withMessage('Status must be either "sent" or "draft".')
        .isString()
        .withMessage('Status must be a string.')
        .trim()
        .escape(),

    body('task_id')
        .isInt({ min: 1 })
        .withMessage('Task ID is required and must be a valid integer.')
        .toInt(),

    body("start_time")
        .isLength({ min: 1 })
        .withMessage("Start date must be required.")
        .isString()
        .customSanitizer((value) => {
            const date = new Date(value);
            return isNaN(date.getTime()) ? null : date.toISOString();
        })
        .custom((value) => {
            const date = new Date(value);
            return !isNaN(date.getTime());
        })
        .withMessage("Start date must be a valid date."),
    body('duration_minutes')
        .isInt({ min: 1 })
        .withMessage('Duration must be a valid integer greater than 0.')
        .toInt(),
];

module.exports = workLogValidators;
