const { body } = require('express-validator');

module.exports = {
    authenticate: [
        body('email').notEmpty().isEmail().normalizeEmail(),
        body('password').notEmpty().isLength({ min: 6 }).withMessage('must be at least 6 chars long')
    ],
}