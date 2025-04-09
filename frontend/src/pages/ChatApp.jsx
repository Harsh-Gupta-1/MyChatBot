import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import API_URL from '../api';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, how may I help you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
        userID: "12345",
        message: input,
      });

      if (response.data.reply) {
        setMessages((prev) => [
          ...prev,
          { text: response.data.reply, sender: "bot" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full bg-white overflow-hidden">
      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 md:p-4 flex flex-col"
      >
        <div className="w-full max-w-4xl mx-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } mb-3`}
            >
              <div
                className={`p-3 md:p-4 max-w-[85%] md:max-w-[80%] rounded-2xl shadow-sm ${
                  msg.sender === "user" 
                    ? "bg-[#4096FB] text-white" 
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <ReactMarkdown>
                  {msg.text || ""}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start mb-3">
              <div className="p-3 bg-gray-100 text-gray-500 rounded-2xl flex items-center">
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Bar - Fixed at bottom */}
      <div className="border-t border-gray-200 p-3 md:p-4 bg-white">
        <div className="flex items-center w-full max-w-4xl mx-auto">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg py-2 md:py-3 px-3 md:px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-2 md:ml-3 bg-blue-500 text-white rounded-lg p-2 md:p-3"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13"></path>
              <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;