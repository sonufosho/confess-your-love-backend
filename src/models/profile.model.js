import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  yourName: {
    type: String,
    required: true
  },
  crushName: {
    type: String,
    required: true
  },
  firstHobby: {
    type: [{
      type: String,
      enum: ['I love cooking', 'I love cats', 'I love dogs', 'I love kids', 'I have a soft heart', 'I have muscules', 'I can drive']
    }],
    required: true
  },
  secondHobby: {
    type: [{
      type: String,
      enum: ['I can do the dishes', 'I can carry you in games', 'I can give you hugs', 'I can give you kisses', 'I can take care of you', 'I can give you flowers', 'I can lift you up', 'I can take you to long drives', 'I can take you to coffee dates', 'I can take you to dinner dates', 'I can take you to shopping' ]
    }],
    required: true
  },
  thirdHobby: {
    type: [{
      type: String,
      enum: ['I would love to cook with you', 'I would love to go with you', 'I would love to hold your hands', 'I would love to workout with you']
    }],
    required: true
  }

}, { timestamps: true }); // createdAt & updatedAt

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;