import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";

export const userProfile = async (req, res) => {
  const { username } = req.params;

  const user = req.user;
  
  if (user.username !== username) return res.status(404).json({ message: 'User not found' });

  res.status(200).json({
    fullName: user.fullName,
    username: user.username,
    email: user.email
  });
}

export const updateProfile = async (req, res) => {
  const { yourName, crushName, relationshipType, firstHobby, secondHobby, thirdHobby, message } = req.body;

  try {
    if (!yourName || !crushName || !relationshipType || !firstHobby || !secondHobby || !thirdHobby || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if name is greater than 3 characters
    if (yourName.length < 3 || crushName.length < 3) {
      return res.status(400).json({ message: 'Name must be at least 3 characters' });
    }

    const user = req.user;

    // Check if profile exists for this user
    const profile = await Profile.findById(user._id);

    if (profile) {
      // Update existing profile
      profile.yourName = yourName;
      profile.crushName = crushName;
      profile.relationshipType = relationshipType;
      profile.firstHobby = firstHobby;
      profile.secondHobby = secondHobby;
      profile.thirdHobby = thirdHobby;
      profile.message = message;

      await profile.save();

      res.status(200).json({
        yourName: profile.yourName,
        crushName: profile.crushName,
        relationshipType: profile.relationshipType,
        firstHobby: profile.firstHobby,
        secondHobby: profile.secondHobby,
        thirdHobby: profile.thirdHobby,
        message: profile.message
      });

    } else {
      // Create new profile
      const newProfile = new Profile({
        _id: user._id,
        yourName,
        crushName,
        relationshipType,
        firstHobby,
        secondHobby,
        thirdHobby,
        message
      });

      await newProfile.save();

      res.status(201).json({
        yourName: newProfile.yourName,
        crushName: newProfile.crushName,
        relationshipType: profile.relationshipType,
        firstHobby: newProfile.firstHobby,
        secondHobby: newProfile.secondHobby,
        thirdHobby: newProfile.thirdHobby,
        message: newProfile.message
      });
    }

  } catch (error) {
    console.log('Error in user controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const confess = async (req, res) => {
  const { username } = req.params;

  // Find the user by username
  const user = await User.findOne({ username }); // username: req.params.username
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Get the profile when _id matches with user._id
  const profile = await Profile.findOne({ _id: user._id });
  if (!profile) return res.status(404).json({ message: 'Profile not found' });

  res.status(201).json({
    yourName: profile.yourName,
    crushName: profile.crushName,
    firstHobby: profile.firstHobby,
    secondHobby: profile.secondHobby,
    thirdHobby: profile.thirdHobby
  });
}