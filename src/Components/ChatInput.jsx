import React, { useEffect, useState } from 'react'

const ChatInput = () => {
    const [userMessage, setUserMessage] = useState('')


    const [inputInitHeight, setInputInitHeight] = useState(0);


    const handleChat = async () => {
        const trimmedMessage = userMessage.trim();
        if (!trimmedMessage) return;
        console.log(userMessage)
        setUserMessage('');
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
    )
}

export default ChatInput
