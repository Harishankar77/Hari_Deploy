import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transpoter from "../config/nodemailer.js";
// User Registeration
export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are Required",
        success: false,
      });
    }
    // Existing Users Check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        message: "User is Already Registered please try again another User ",
        success: false,
      });
    }
    // Password Hashing
    const hashedpassword = await bcrypt.hash(password, 10);

    // Create a User
    await User.create({
      name,
      email,
      password: hashedpassword,
    });
    // Create a JsonWeb token
    const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    // Send Cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    // Send Welcome Email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Hari MERN Stack",
      text: `Welcone to Hari MERN Stack Website. Your Account is created Successfully at Email is : ${email} `,
    };
    // send Email Logic
    await transpoter.sendMail(mailOptions);

    return res.status(200).json({
      message: "User Registered Sucessfully :)",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// User Login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid Email or Passwords please try again ",
        success: false,
      });
    }
    // Check if User is Registered or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid Email or Password",
        sucess: false,
      });
    }
    // Check if User entered password correct or not
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or Password",
        success: false,
      });
    }
    // Create a JsonWeb token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    // Send Cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "User Login Sucessfully :)",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// User  Logout
export const Logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "User Logout Successfully :) ",
      sucess: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Send Verification OTP to the User's Email
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user.isAccountVerified) {
      return res.json({
        sucess: false,
        message: "Account is already Verified",
      });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000)); // 6 digit verify otp Logic
    // Store Verify otp in database model
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // one day calculation
    await user.save(); // user save in data base

    // send email in users emails
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is. ${otp} . Verify Your Account using this OTP. `,
    };
    await transpoter.sendMail(mailOptions);
    res.json({
      success: true,
      message: "Verification OTP Send on Email",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Verify User Email With OTP.
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.json({
      success: false,
      message: "Messing Details ",
    });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User is not found  ",
      });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP is Expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Email Verified Sucessfully :) ",
    });
  } catch (error) {
    console.log(error);
  }
};

// Check if User is Authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ successs: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
