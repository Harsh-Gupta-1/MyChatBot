import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import API_URL from '../api';
const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "bot" },
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
    <div className="flex flex-col h-screen w-full bg-[#343541]">
      {/* Navbar */}
      <div className="w-full bg-[#202123] text-white p-4 flex justify-between items-center border-b border-[#444654] shadow-md">
        <h1 className="text-lg font-bold tracking-wide">ChatBot</h1>
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center shadow-inner">
          <span className="text-sm font-bold text-white">HG</span>
        </div>
      </div>

      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col items-center w-full"
      >
        <div className="w-full max-w-[60%]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`p-4 max-w-[80%] text-white rounded-lg shadow-md break-words ${
                  msg.sender === "user" ? "bg-[#0a84ff]" : "bg-[#444654]"
                }`}
                style={{ lineHeight: "1.5", padding: "12px 16px" }}
              >
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="prose prose-invert prose-lg" {...props} />
                    ),
                    h1: ({ node, ...props }) => (
                      <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-xl font-bold mt-3 mb-2" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        className="text-lg font-semibold mt-2 mb-1"
                        {...props}
                      />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc list-inside mt-2 mb-2"
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        className="list-decimal list-inside mt-2 mb-2"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="ml-4" {...props} />
                    ),
                  }}
                >
                  {msg.text || ""}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start mb-2">
              <div className="p-3 bg-[#444654] text-white rounded-lg flex items-center animate-pulse">
                <span>Responding...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Bar */}
      <div className="flex items-center p-4 w-full bg-[#40414F] border-t border-[#444654]">
        <div className="w-full max-w-[60%] mx-auto flex items-center bg-[#343541] p-2 rounded-full shadow-lg backdrop-blur-md">
          <input
            type="text"
            className="flex-1 bg-transparent text-white outline-none px-4"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-2 p-2 rounded-full bg-white border border-gray-300 text-black flex items-center justify-center w-10 h-10 hover:bg-gray-200 active:scale-95 transition-all shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6"
            >
              <path
                d="M12 4v16m0-16l-6 6m6-6l6 6"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
