import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConvoComp } from '../utils/slice';
import useSound from 'use-sound';
import { MessageReceiver, MessageSender } from '../utils/Messager';
import ConversationListData from '../utils/Conversation';

const ConvoList = ({ config_id }) => {
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurretPage] = useState(1);

  const dispatch = useDispatch();

  const chat_users = useSelector((state) => state.baseData['chat_users']);

  const email = useSelector((state) => state.baseData['email']);

  useEffect(() => {
    const fetchconversation = async () => {
      console.log("here")
      const message_receiver = MessageReceiver(config_id, chat_users, currentPage);
      console.log(message_receiver);
      const conversation_data = await ConversationListData(email, message_receiver);
      console.log(conversation_data);
    };
    fetchconversation();
  }, [setCurretPage]);

  const addpage = () => {
    setCurretPage(currentPage + 1);
  };

  const [PlaysendSound] = useSound('https://static.openreplay.com/tracker-assist/notification.mp3');

  const ConvoComponent = () => {
    dispatch(setConvoComp(false));
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      alert('enter a valid input');
      return;
    }
    PlaysendSound();
    setInputValue('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <button onClick={ConvoComponent}>Go back</button>
      <h1>This is a new conversation</h1>
      <button onClick={addpage}>more ..</button>
      <form onSubmit={sendChat}>
        <label>
          <input type="text" name="name" value={inputValue} onChange={handleInputChange} />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ConvoList;
