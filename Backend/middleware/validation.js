// backend/middleware/validation.js
import { body } from 'express-validator';

export const validateSignUp = [
  body('firstName').notEmpty().withMessage('First Name is required'),
  body('lastName').notEmpty().withMessage('Last Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('phone')
    .isLength({ min: 10, max: 10 })
    .withMessage('Phone number must be 10 digits'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const validateSignIn = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];
