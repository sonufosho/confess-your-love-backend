import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: 'Unauthorized. No token provided' });

    // Verify jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: 'Unauthorized. Invalid token' });

    // Find user by id and we don't need to send the password
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = user;

    next();

  } catch (error) {
    console.log('Error in authenticate middleware', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}