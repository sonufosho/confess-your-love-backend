import Profile from "../models/profile.model.js";

export const profile = async (req, res) => {
  const { yourName, crushName, firstHobby, secondHobby, thirdHobby } = req.body;

  try {
    if (!yourName || !crushName || !firstHobby || !secondHobby || !thirdHobby) {
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
      profile.firstHobby = firstHobby;
      profile.secondHobby = secondHobby;
      profile.thirdHobby = thirdHobby;

      await profile.save();

      res.status(200).json({
        yourName: profile.yourName,
        crushName: profile.crushName,
        firstHobby: profile.firstHobby,
        secondHobby: profile.secondHobby,
        thirdHobby: profile.thirdHobby
      });

    } else {
      // Create new profile
      const newProfile = new Profile({
        _id: user._id,
        yourName,
        crushName,
        firstHobby,
        secondHobby,
        thirdHobby
      });

      await newProfile.save();

      res.status(201).json({
        yourName: newProfile.yourName,
        crushName: newProfile.crushName,
        firstHobby: newProfile.firstHobby,
        secondHobby: newProfile.secondHobby,
        thirdHobby: newProfile.thirdHobby
      });
    }

  } catch (error) {
    console.log('Error in user controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}