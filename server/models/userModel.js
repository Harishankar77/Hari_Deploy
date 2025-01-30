import mongoose from "mongoose";
const userSchema = mongoose.Schema;
const userModel = new userSchema({
  name: {
    type: String,
    reduired: true,
  },
  email: {
    type: String,
    reduired: true,
    unique: true,
  },
  password: {
    type: String,
    reduired: true,
  },
  verifyOtp: {
    type: String,
    default: "",
  },
  verifyOtpExpireAt: {
    type: Number,
    default: 0,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  resetOtp: {
    type: String,
    default: "",
  },
  resetOtpExpireAt: {
    type: Number,
    default: 0,
  },
});
const User = mongoose.model("User", userModel);
export default User;
