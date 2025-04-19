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
const validateRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  }).withMessage('Password must be ≥8 chars with upper, lower, number & symbol'),
];

// Validation middleware for login
const validateLogin = [
  body('email')
    .isEmail().withMessage('Must be a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
];

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.get('/me', protect, (req, res) => { res.json(req.user) });

module.exports = router;