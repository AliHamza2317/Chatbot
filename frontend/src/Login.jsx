import React, { useState } from "react";
import image from "./assets/chatgpt.png";
import chatbot from "./assets/chatbot.png";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";

export default function LoginPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    console.log("Logging in user...");

    if (!email || !password) {
      toast.error("❌ Please fill in both fields.");
      return;
    }

    setLoading(true);

    const data = { email, password };

    axios
      .post("http://0.0.0.0:3004/api/auth/login", data)
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          if (response.data.student.role === "Admin") {
                toast.success("✅ Admin Login successful!");
            setTimeout(() => {
            navigate("/history"); 
          }, 2000);
          }
          else{
          console.log("Login successful:", response.data);
          localStorage.setItem("userId", response.data.student.id);
          localStorage.setItem("username", response.data.student.name);
          toast.success("✅ Login successful!");
          
          setTimeout(() => {
            navigate("/chat"); 
          }, 2000);
        }
        } else {
          toast.error("❌ " + response.data.error);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("❌ An error occurred. Please try again.");
      });
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-[#1a1d2e] p-4">
      <div className="bg-[#23263a] rounded-3xl w-full max-w-6xl flex shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 hidden md:flex flex-col items-center justify-center p-10 relative">
          <img
            src={chatbot}
            alt="Character"
            className="w-100 h-auto z-10"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 bg-[#23263a] p-10 text-white">
          <div className="mt-20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-500 text-2xl">♥</span>
              <h2 className="text-2xl font-bold">Welcome to NovaAI!</h2>
            </div>
            <p className="text-sm text-gray-400">
              Please sign in to your account and start the adventure
            </p>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              placeholder="admin@vuexy.com"
              className="w-full p-3 mt-1 rounded-xl bg-[#2e3047] text-white focus:outline-none" onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full p-3 mt-1 rounded-xl bg-[#2e3047] text-white focus:outline-none" onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-purple-500" /> Remember Me
            </label>
            <a href="#" className="text-purple-500 hover:underline">
              Forgot Password?
            </a>
          </div> */}

          <button className="w-full bg-purple-500 hover:bg-purple-600 transition p-3 rounded-xl font-bold" onClick={handleLogin}>
            Login
          </button>

          <p className="mt-6 text-center text-sm text-gray-400">
            New on our platform?{" "}
            <button className="text-purple-500 hover:underline" onClick={handleRegisterRedirect}>
              Create an account
            </button>
          </p>

         
        </div>
      </div>
    </div>
     <ToastContainer position="top-right" autoClose={3000} />
     </>
  );
}
