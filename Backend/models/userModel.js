import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: {
      validator: function(v) {
        return /\S+@\S+\.\S+/.test(v); // Simple email regex validation
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  phone: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v); // Validate phone number to ensure it is exactly 10 digits
      },
      message: props => `Phone number ${props.value} must be 10 digits long!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"], // Minimum password length validation
  },
}, {
  timestamps: true // Add timestamps for createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

export default User;
