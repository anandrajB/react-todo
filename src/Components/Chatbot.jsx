import React, { useState, useEffect } from 'react';
import chatbotIcon from '../assets/chatbot.png';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [inputInitHeight, setInputInitHeight] = useState(0);
  const [chatHistory, setChatHistory] = useState([{ role: 'bot', content: 'Hi there! How can I help you today?' }]);

  useEffect(() => {
    setInputInitHeight(document.querySelector('.chat-input textarea').scrollHeight);
  }, []);

  const createChatLi = (message, role) => {
    return {
      role,
      content: message,
    };
  };

  const handleChat = async () => {
    const trimmedMessage = userMessage.trim();
    if (!trimmedMessage) return;

    setUserMessage('');

    setChatHistory((prevChatHistory) => [...prevChatHistory, createChatLi(trimmedMessage, 'user')]);
  };

  const handleInputChange = (e) => {
    e.target.style.height = `${inputInitHeight}px`;
    e.target.style.height = `${e.target.scrollHeight}px`;
    setUserMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  return (
    <div>
      <button className="chatbot-toggler" onClick={() => document.body.classList.toggle('show-chatbot')}>
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className="chatbot">
        <header>
          <img className="kredibot-icon" src={chatbotIcon} alt="Chatbot Icon" />
          <h2>Kredibot</h2>
          <span
            className="close-btn material-symbols-outlined"
            onClick={() => document.body.classList.remove('show-chatbot')}
          >
            close
          </span>
        </header>
        <ul className="chatbox">
          {chatHistory.map((chat, index) => (
            <li key={index} className={`chat ${chat.role}`}>
              {chat.role === 'bot' && <span className="material-symbols-outlined">smart_toy</span>}
              <p>{chat.content}</p>
            </li>
          ))}
        </ul>
        <div className="chat-input">
          <textarea
            placeholder="Enter a message..."
            spellCheck="false"
            required
            value={userMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          ></textarea>
          <span id="send-btn" className="material-symbols-rounded" onClick={handleChat}>
            send
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
