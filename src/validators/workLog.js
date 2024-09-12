const { body } = require("express-validator");

const workLogValidators = [
    body('notes')
        .isLength({ min: 1 })
        .withMessage('Notes are required.')
        .isString()
        .withMessage('Notes must be a string.')
        .trim()
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

    body('start_time')
        .isISO8601()
        .withMessage('Start time must be a valid ISO 8601 date format.')
        .toDate(),

    body('duration_minutes')
        .isInt({ min: 1 })
        .withMessage('Duration must be a valid integer greater than 0.')
        .toInt(),

    body('deleted')
        .optional({ nullable: true })
        .isBoolean()
        .withMessage('Deleted must be a boolean value.')
        .toBoolean(),
];

module.exports = workLogValidators;
