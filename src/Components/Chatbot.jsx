import React from 'react';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', content: 'Hi there 👋\nHow can I help you today?' },
  ]);

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  const handleChat = () => {
    if (!userMessage.trim()) return;

    setChatMessages((prevMessages) => [...prevMessages, { role: 'user', content: userMessage.trim() }]);

    setUserMessage('');

    setTimeout(() => {
      setChatMessages((prevMessages) => [...prevMessages, { role: 'bot', content: 'Thinking...' }]);

      // You should call your API here to get the response and update the state
      // For simplicity, I'm using a dummy response.
      setTimeout(() => {
        setChatMessages((prevMessages) => [...prevMessages, { role: 'bot', content: 'Dummy response from API.' }]);
      }, 600);
    }, 600);
  };

  return (
    <div className="chatbot">
      <header>
        <h2>Chatbot</h2>
        <span className="close-btn material-symbols-outlined">close</span>
      </header>
      <ul className="chatbox">
        {chatMessages.map((message, index) => (
          <li key={index} className={`chat ${message.role === 'user' ? 'outgoing' : 'incoming'}`}>
            {message.role === 'user' ? (
              <p>{message.content}</p>
            ) : (
              <>
                <span className="material-symbols-outlined">smart_toy</span>
                <p>{message.content}</p>
              </>
            )}
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
  );
};

export default Chatbot;
