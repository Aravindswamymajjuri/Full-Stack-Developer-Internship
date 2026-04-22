const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // basic validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // check if email already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Signup failed: Email already exists -', email);
      return res.status(400).json({ message: 'This email is already registered' });
    }

    // create new user (password gets hashed automatically in User.js pre-save hook)
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    console.log('New user created:', email);

    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ message: 'Something went wrong during signup' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // fetch user with password field (normally not returned)
    const userRecord = await User.findOne({ email }).select('+password');

    if (!userRecord) {
      console.log('Login failed: User not found -', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // check if password is correct
    const isPasswordValid = await userRecord.matchPassword(password);
    if (!isPasswordValid) {
      console.log('Login failed: Wrong password for -', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('User logged in:', email);
    const token = generateToken(userRecord._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: userRecord._id,
        name: userRecord.name,
        email: userRecord.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Something went wrong during login' });
  }
};
