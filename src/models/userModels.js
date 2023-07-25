import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  firstName: {
    type: String,
    required: [true, "first name required!"],
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },

  role: {
    type: String,
    default: "USER",
    enum: [
      "ADMIN",
      "USER"
    ],
  }
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
