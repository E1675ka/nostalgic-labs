// backend/routes/userRoutes.js
import express from 'express';
import { signUp, signIn } from '../controllers/usercontroller.js'; // Add signIn controller
import { validateSignUp, validateSignIn } from '../middleware/validation.js'; // Add signIn validation

const router = express.Router();

// POST route for sign-up with validation middleware
router.post('/signup', validateSignUp, signUp);

// POST route for sign-in with validation middleware
router.post('/signin', validateSignIn, signIn);

export default router;
