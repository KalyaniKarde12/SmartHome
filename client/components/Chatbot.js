'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm your assistant. How can I help you today?" }
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await axios.post('/api/chat', { message: input });
      const botReply = { sender: 'bot', text: response.data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      const errorReply = { sender: 'bot', text: "Error connecting to AI 🤖" };
      setMessages((prev) => [...prev, errorReply]);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '12px 20px',
          backgroundColor: '#4A90E2',
          color: 'white',
          borderRadius: '30px',
          cursor: 'pointer',
          border: 'none',
          zIndex: 1000
        }}
      >
        {isOpen ? 'Close Chat' : 'Chat with us'}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '300px',
            height: '400px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999
          }}
        >
          <div style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === 'bot' ? 'left' : 'right',
                  margin: '5px 0'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    borderRadius: '15px',
                    background: msg.sender === 'bot' ? '#f1f1f1' : '#4A90E2',
                    color: msg.sender === 'bot' ? '#000' : '#fff'
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid #ccc' }}>
            <input
              style={{ flex: 1, border: 'none', padding: '10px' }}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
            />
            <button
              style={{
                padding: '10px 15px',
                backgroundColor: '#4A90E2',
                color: 'white',
                border: 'none'
              }}
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
