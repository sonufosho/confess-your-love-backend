import bcrypt from 'bcrypt';
import User from "../models/user.model.js";
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  try {
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if username is greater than 3 characters
    if (username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters' });
    }

    // Check if username is valid: regex
    const usernameRegex = /^[a-z0-9._]+$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ message: 'Usernames can only contain lowercase letters, numbers, underscores and periods' });
    }

    // Check if username already exists
    const findUsername = await User.findOne({ username });
    if (findUsername) return res.status(400).json({ message: 'This username is not available' });

    // Check if email is valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if email already exists
    const findEmail = await User.findOne({ email });
    if (findEmail) return res.status(400).json({ message: 'This email already exists' });

    // Check if password is greater than 8 characters
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullName,
      username,
      email,
      password: hashedPassword
    });

    if (!user) return res.status(400).json({ message: 'Invalid user data' });

    await user.save();

    const payload = {
      fullName: user.fullName,
      username: user.username,
      email: user.email
    }

    generateToken(payload, res);

    res.status(201).json({
      fullName: user.fullName,
      username: user.username,
      email: user.email
    });

  } catch (error) {
    console.log('Error in signup controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    generateToken(user._id, res);

    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      username: user.username
    });

  } catch (error) {
    console.log('Error in login controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 });
  res.status(200).json({ message: 'Logged out successfully' });
}