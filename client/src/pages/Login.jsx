import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { appContent } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(appContent);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === "Sign up") {
        const { data } = await axios.post("https://hari-auth-server.onrender.com/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          // getUserData(); This line show the error like User is notAuthorized toast popup
          toast.success("Registered Successfully");
          setName("");
          setEmail("");
          setPassword("");
          setState("Login");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post("https://hari-auth-server.onrender.com/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          // getUserData();
          toast.success("Login Successfully");
          setEmail("");
          setPassword("");
          navigate("https://harishankar.onrender.com");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="absolute  left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 w-full rounded-lg shadow-lg p-10 sm:w-96 text-indigo-200 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center mb-6 text-sm">
          {state === "Sign up"
            ? "Create your Account"
            : "Login to your Account"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign up" && (
            <div className="flex mb-4 items-center gap-3 rounded-full px-5 py-2.5 bg-[#333A5C]">
              <img src={assets.person_icon} alt="user_logo" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none text-white"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}
          <div className="flex mb-4 items-center gap-3 rounded-full px-5 py-2.5 bg-[#333A5C]">
            <img src={assets.mail_icon} alt="user_logo" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none text-white"
              type="email"
              placeholder="Email id"
              required
            />
          </div>
          <div className="flex mb-4 items-center gap-3 rounded-full px-5 py-2.5 bg-[#333A5C]">
            <img src={assets.lock_icon} alt="user_logo" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none text-white"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-600 cursor-pointer hover:underline"
          >
            Forgot Password?
          </p>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer text-white font-medium">
            {state}
          </button>
        </form>

        {state === "Sign up" ? (
          <p className="text-gray-400 mt-4 text-xm text-center">
            Already have an Account?
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 mt-4 text-xm text-center">
            Don't have an Account?{" "}
            <span
              onClick={() => setState("Sign up")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Sign up here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
