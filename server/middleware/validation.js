const { check, validationResult } = require('express-validator')

const checkValidation = () => {
  return [
    check('firstName').notEmpty().withMessage('Please enter required fields'),
    check('lastName').notEmpty().withMessage('Please enter required fields'),
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Must be at least 6 characters'),
  ]
}

const validate = (req, res, next) => {
  errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  } else {
    console.log({ errors: errors.array() })
    return res.status(400).json({ errors: errors.array() })
  }
}

module.exports = { checkValidation, validate }
