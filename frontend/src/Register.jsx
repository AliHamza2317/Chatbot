import React, { useState } from "react";
import image from "./assets/chatgpt.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import chatbot from "./assets/chatbot.png";
export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
const handleRegister = () => {
  if (name && email && password && confirmPassword) {
    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match");
      return;
    }

    setLoading(true);
    const data = { name, email, password };

    axios.post("http://localhost:3004/api/auth/register", data)
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          toast.success("✅ User registered successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast.error("❌ " + response.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("❌ An error occurred. Please try again.");
      });
  } else {
    toast.error("❌ Please fill in all fields");
  }
};


  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#1a1d2e] p-4">
        <div className="bg-[#23263a] rounded-3xl w-full max-w-6xl flex shadow-lg overflow-hidden">
          {/* Left Side */}
          <div className="w-1/2 hidden md:flex flex-col items-center justify-center p-10 relative">
            <img src={chatbot} alt="Character" className="w-100 h-auto z-10" />
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 bg-[#23263a] p-10 text-white">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-purple-500 text-2xl">♥</span>
                <h2 className="text-2xl font-bold">Welcome to NovaAI!</h2>
              </div>
              <p className="text-sm text-gray-400">
              Create an account and join the adventure!
              </p>
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-400">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 mt-1 rounded-xl bg-[#2e3047] text-white focus:outline-none"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="text"
                placeholder="admin@vuexy.com"
                className="w-full p-3 mt-1 rounded-xl bg-[#2e3047] text-white focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-400">Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full p-3 mt-1 rounded-xl bg-[#2e3047] text-white focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-400">Confirm Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full p-3 mt-1 rounded-xl bg-[#2e3047] text-white focus:outline-none"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>



            <button
              type="button"
              className="w-full bg-purple-500 hover:bg-purple-600 transition p-3 rounded-xl font-bold"
              onClick={handleRegister}
              disabled={loading}
            >
              Register
            </button>

           
           
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
