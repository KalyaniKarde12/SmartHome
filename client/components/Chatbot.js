"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X, GripVertical } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  // Handle sending message
  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "I'm a chatbot! How can I help?", sender: "bot" },
        ]);
        setIsTyping(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">
      {/* Chatbot Icon */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 p-4 rounded-full shadow-xl hover:scale-105 transition-transform z-50"
        style={{ pointerEvents: "auto" }}
        whileHover={{ rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={26} color="white" />
      </motion.button>

      {/* Chatbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg w-80 mt-3 border border-gray-300 z-50 relative"
            drag
            dragConstraints={{ top: -100, left: -100, right: 100, bottom: 100 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2 cursor-move">
              <GripVertical size={20} className="text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-800">Chatbot</h2>
              <button onClick={() => setIsOpen(false)}>
                <X size={20} className="text-gray-500 hover:text-red-600 transition" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-52 overflow-y-auto border p-3 rounded-lg bg-gray-100 space-y-2 transition-all">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-2 rounded-md max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="p-2 rounded-md bg-gray-300 text-black w-16"
                >
                  ...
                </motion.div>
              )}
            </div>

            {/* Input Field */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full border p-2 rounded-md outline-none bg-white"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
