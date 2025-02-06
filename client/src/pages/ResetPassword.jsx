import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { appContent } from "../context/appContext";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { backendUrl } = useContext(appContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);
  const inputRefs = React.useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    // Move to next input if a number is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input when pressing backspace on an empty input
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent default paste behavior
    const paste = e.clipboardData.getData("text");
    paste.split("").forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
        if (index < 5) {
          inputRefs.current[index + 1].focus();
        }
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://hari-auth-server.onrender.com/api/auth/send-reset-otp",
        { email }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmited(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://hari-auth-server.onrender.com/api/auth/send-password",
        { email, otp, newPassword }
      );
      if (data.success) {
        toast.success(data.message);
        data.success && navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      {/* Enter Email Id first step */}
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-900 rounded-lg p-8 shadow-lg w-96 text-sm"
        >
          <h1 className="text-2xl text-white font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter Your Registered Email Id.
          </p>
          <div className="mb-4 w-full rounded-full px-5 py-2.5 gap-3 flex items-center bg-[#8889cf] text-white">
            <img src={assets.mail_icon} alt="mail_icon" className="w-3 h-3" />
            <input
              type="email"
              placeholder="Enter Your Email Id"
              className="bg-transparent outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-2.5 rounded-full cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-900 mt-3 text-white">
            Submit
          </button>
        </form>
      )}
      {/* OTP input form  second step */}

      {!isOtpSubmited && isEmailSent && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-slate-900 rounded-lg p-8 shadow-lg w-96 text-sm"
        >
          <h1 className="text-2xl text-white font-semibold text-center mb-4">
            Reset Password OTP
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-Digit Code Sent to Your Email
          </p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  ref={(e) => (inputRefs.current[index] = e)}
                  type="text"
                  maxLength="1"
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 bg-[#333A5C] text-xl text-center text-white rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ))}
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer group transition duration-300 ease-in-out hover:opacity-90">
            Submit
          </button>
        </form>
      )}
      {/* New Password third step */}

      {isOtpSubmited && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-slate-900 rounded-lg p-8 shadow-lg w-96 text-sm"
        >
          <h1 className="text-2xl text-white font-semibold text-center mb-4">
            New Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter New Password Below.
          </p>
          <div className="mb-4 w-full rounded-full px-5 py-2.5 gap-3 flex items-center bg-[#8889cf] text-white">
            <img src={assets.lock_icon} alt="mail_icon" className="w-3 h-3" />
            <input
              type="password"
              placeholder="Enter Your New Password"
              className="bg-transparent outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-2.5 rounded-full cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-900 mt-3 text-white">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
