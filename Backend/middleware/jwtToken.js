import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET; // Load from .env file

// Generate a JWT token
const generateToken = (user) => {
  const payload = { id: user._id, email: user.email }; // Add user info to payload
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token valid for 1 hour
  return token;
};

// Verify a JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey); // Decode the token
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

// Example usage
const user = { _id: "12345", email: "test@example.com" };
const token = generateToken(user);

console.log("Token:", token);
console.log("Verified Payload:", verifyToken(token));
