import jwt from 'jsonwebtoken';

const generateToken = (user, res) => {
  // user: { _id, fullName, username, email }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  res.cookie('jwt', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // in MS
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    sameSite: 'strict', // prevent CSRF attacks
    secure: process.env.MODE === 'development' ? false : true
  });

  return token;
}

export default generateToken;