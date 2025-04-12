const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const {
  register,
  login,
  logout,
  getCurrentUser
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

// Validation middleware for register
const validationRegister = [
  body('name')
    .notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('Must be a vaild email'),
  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage('Password must be ≥8 chars with upper, lower, number & symbol'),
];

// Validation middleware for login
const validateLogin = [
  body('email')
    .isEmail().withMessage('Must be a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
];

// A little helper to collect validation errors
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return first error or array
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

router.post('/register', validationRegister, handleValidation, register);
router.post('/login', validateLogin, handleValidation, login);
router.post('/logout', logout);
router.get('/me', protect, getCurrentUser);

module.exports = router;