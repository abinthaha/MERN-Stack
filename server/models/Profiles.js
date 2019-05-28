import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    age: {
        type: Number,
    },
    mobile: {
      type: Number,
  },
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;