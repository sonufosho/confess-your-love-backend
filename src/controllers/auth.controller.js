import { User } from "../models/user.model.js";

export const signup = async (req, res) => {
  const { fullName, username, password } = req.body;

  try {
    if (!fullName || !username || !password) {
      return res.status(400).json({message: 'All fields are required' });
    }

    const user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: 'This username is not available' });

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