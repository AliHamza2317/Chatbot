import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";


const BASE_URL = "http://127.0.0.1:5005";
const API_URL = `${BASE_URL}/chat`;
const HISTORY_API = `${BASE_URL}/history`;

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
  const [selectedQuery, setSelectedQuery] = useState("");
 const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };
  useEffect(() => {
    let id = localStorage.getItem("userId");
    let username = localStorage.getItem("username");
    setUserId(id);
    setUsername(username);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !userId) return;

    const userMessage = { sender: "user", text: input };
    setChat((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await axios.post(API_URL, {
        text: input,
        user_id: userId,
        username: username,
      });

      const botMessage = { sender: "bot", text: res.data.bot };
      setChat((prev) => [...prev, botMessage]);
      setInput("");
      setIsLoading(false);
    } catch (err) {
      console.error("Error sending message:", err);
      setIsLoading(false);
    }
  };

useEffect(() => {
  if (!userId) return;

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${HISTORY_API}/${userId}`);
      const data = res.data.history || [];
      setHistory(data);

      // Populate chat view
      const conversation = data.flatMap((item) => [
        { sender: "user", text: item.user },
        { sender: "bot", text: item.bot },
      ]);
      setChat(conversation);
    } catch (err) {
      console.error("Failed to load history", err);
      setHistory([]);
    }
  };

  fetchHistory();
}, [userId]);

  const handleEnter = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // Extract unique user searches
  const uniqueSearches = Array.from(new Set(history.map((item) => item.user)));

  return (
    <div className="min-h-screen flex bg-gray-100">
       <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition duration-200"
      >
        Logout
      </button>
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 border-r shadow-md hidden md:block">
        <h2 className="text-lg font-semibold mb-4">🧾 Chat History</h2>
        <div className="space-y-2 max-h-screen overflow-y-auto pr-2">
          {uniqueSearches.map((query, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedQuery(query);
                const filtered = history.filter((item) => item.user === query);
                const conversation = filtered.flatMap((item) => [
                  { sender: "user", text: item.user },
                  { sender: "bot", text: item.bot },
                ]);
                setChat(conversation);
              }}
              className={`block text-left w-full text-sm p-2 rounded ${
                selectedQuery === query
                  ? "bg-blue-200 font-bold"
                  : "hover:bg-blue-100"
              } text-blue-600`}
            >
              🧑 {query}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 p-4 flex flex-col">
        <h1 className="text-xl font-bold text-center mb-4">💬 AI Chatbot</h1>
<div className="flex-1 overflow-y-auto space-y-4 mb-4 px-4 py-2">
  <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-4 py-2">
  {chat.map((msg, i) => (
    <div
      key={i}
      className="w-full flex"
    >
      <div
        className={`px-4 py-2 rounded-lg text-sm whitespace-pre-wrap leading-relaxed shadow-sm break-words
          ${msg.sender === "user"
            ? "bg-blue-100 text-gray-900 text-right  w-fit ml-[54rem]"
            : "bg-white text-gray-800 text-left mr-auto max-w-[75%]"}
        `}
      >
        <ReactMarkdown>{msg.text}</ReactMarkdown>
      </div>
    </div>
  ))}
</div>


  {isLoading && (
    <div className="w-full flex justify-start">
      <div className="bg-white text-gray-600 text-sm px-4 py-2 rounded-lg max-w-[75%] shadow-sm animate-pulse">
        Bot is typing...
      </div>
    </div>
  )}
</div>


        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
