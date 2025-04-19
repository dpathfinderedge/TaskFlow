const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator')

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { 
    expiresIn: '1d'
   });
};

exports.register = async (req, res) => {
  // A little helper to collect validation errors
  const errors = validationResult(req);
  // console.log(errors);

  if (!errors.isEmpty()) {
    const formatted = errors.array().map(err => ({ [err.path]: err.msg }));
    console.log(formatted);
    return res.status(400).json({ errors: formatted });
  }

  const { name, email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      console.log('Email already exists');
      return res.status(400).json({ errors: [{ email: 'Email already in use' }] });
    }

    const user = await User.create({ name, email, password });

    const token = createToken(user);
    res
      .cookie('token', token, { 
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        // sameSite: 'Lax',
        // maxAge: 24 * 60 * 60 * 1000
      })
      .status(201)
      .json({ message: 'User registered successfully' });
    
      console.log('registered');
  } catch (error) {
    res.status(500).json({ errors: [{ general: 'Something went wrong' }] });
    console.log('failed');
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    const formatted = errors.array().map(err => ({ [err.path]: err.msg }));
    console.log(formatted);
    return res.status(400).json({ errors: formatted });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ errors: [{ credentials: 'Invalid credentials' }] });
    }
    // if (!user) {
    //   return res.status(400).json({ errors: [{ credentials: 'Invalid email' }] });
    // }

    // const isMatch = await user.comparePassword(password);
    // if (!isMatch) {
    //   return res.status(400).json({ errors: [{ credentials: 'Invalid password' }] });
    // }

    const token = createToken(user);
    res
      .cookie('token', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        // sameSite: 'Lax',
        // maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ errors: [{ general: 'Something went wrong' }] });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
};

// exports.getCurrentUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     // console.log(user);
//     res.json(user);
//   } catch (err) {
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// };