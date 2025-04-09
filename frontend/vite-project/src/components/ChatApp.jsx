import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        userID: "123",
        message: input,
      });

      const botMessage = { role: "bot", content: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, something went wrong. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Sidebar */}
      <div className="hidden md:flex flex-shrink-0 w-72 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800">
        <div className="flex h-full min-h-0 flex-col w-full">
          <div className="flex h-full w-full flex-1 flex-col">
            <nav className="flex h-full w-full flex-1 flex-col p-4 space-y-4">
              <button className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-lg hover:shadow-blue-500/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                New chat
              </button>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Chat history would go here */}
              </div>
              <div className="border-t border-gray-800 pt-4">
                <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800/50 transition-all duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear conversations
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden relative">
          <div className="h-full overflow-y-auto custom-scrollbar">
            <div className="flex flex-col items-center text-sm">
              {messages.map((msg, index) => (
                <div key={index} className="w-full text-gray-100 animate-fade-in">
                  <div className={`py-6 ${msg.role === "user" ? "bg-gray-900/50" : "bg-gray-800/50"}`}>
                    <div className="max-w-3xl mx-auto flex gap-6 px-4">
                      <div className="w-10 h-10 flex-shrink-0">
                        {msg.role === "bot" ? (
                          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
                            <img alt="ChatGPT" src="https://chat.openai.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffavicon.a1454431.png&w=32&q=75" className="w-6 h-6" />
                          </div>
                        ) : (
                          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg">
                            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-h-[20px] flex flex-col items-start gap-3 overflow-x-auto whitespace-pre-wrap break-words">
                        <div className="prose prose-invert max-w-none">
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="w-full text-gray-100 bg-gray-800/50 animate-fade-in">
                  <div className="py-6">
                    <div className="max-w-3xl mx-auto flex gap-6 px-4">
                      <div className="w-10 h-10 flex-shrink-0">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
                          <img alt="ChatGPT" src="https://chat.openai.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffavicon.a1454431.png&w=32&q=75" className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="flex-1 min-h-[20px] flex items-start gap-4">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900/80 to-transparent">
          <div className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex h-full flex-1">
              <div className="flex w-full items-center rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 py-3 px-4 shadow-lg">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-8 text-white placeholder-gray-400 focus:ring-0 focus-visible:ring-0"
                  placeholder="Send a message..."
                  rows={1}
                  style={{ maxHeight: "200px", height: "24px", overflowY: "hidden" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="absolute right-3 rounded-lg p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 disabled:hover:text-gray-400 disabled:hover:bg-transparent"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="px-3 pt-2 pb-3 text-center text-xs text-gray-400">
            <span>Free Research Preview. ChatGPT may produce inaccurate information.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp; 