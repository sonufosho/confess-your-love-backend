import { User } from "../models/user.model.js";

export const signup = async (req, res) => {
  const { fullName, username, password } = req.body;

  try {
    if (!fullName || !username || !password) {
      return res.status(400).json({message: 'All fields are required' });
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
    const user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: 'This username is not available' });

    // Check if password is greater than 8 characters
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }
  } catch (error) {
    console.log('Error in signup controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }

  const newUser = new User({
    fullName,
    username,
    password
  });

  if (newUser) {
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      password: newUser.password
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
}