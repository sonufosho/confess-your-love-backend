import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  yourName: {
    type: String,
    required: true
  },
  crushName: {
    type: String,
    required: true
  },
  relationshipType: {
    type: String,
    required: true
  },
  firstHobby: {
    type: String,
    required: true
  },
  secondHobby: {
    type: String,
    required: true
  },
  thirdHobby: {
    type: String,
    required: true
  },
  message: {
    type: String
  }

}, { timestamps: true }); // createdAt & updatedAt

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;