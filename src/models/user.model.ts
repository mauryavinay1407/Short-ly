import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: {
    type: String, // Clerk user ID like 'user_abc123'
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;