import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConvoComp } from '../utils/slice';
import { MessageReceiver, MessageSender } from '../utils/Messager';
import { MutatingDots } from 'react-loader-spinner';
import ChatSocket from '../utils/ChatSocket';
import ChatInput from './ChatInput';

const ConvoList = ({ config_id, all_users, logged_in_email, party_id }) => {
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurretPage] = useState(1);
  const [conversation, setConversation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [shouldFetchConversation, setShouldFetchConversation] = useState(true);

  const dispatch = useDispatch();
  let chat_users, email;
  if (all_users === null && logged_in_email === null) {
    chat_users = useSelector((state) => state.baseData['chat_users']);
    email = useSelector((state) => state.baseData['email']);
  } else {
    chat_users = all_users;
    email = logged_in_email;
  }

  config_id = useSelector((state) => state.baseData['config_id']);

  const fetchconversation = async () => {
    try {
      const message_receiver = MessageReceiver(config_id, chat_users, currentPage);
      const baseData = await ChatSocket(email, message_receiver);
      setConversation(baseData?.data[0]?.message || null);
    } catch (error) {
      console.error('Error in fetchconversation:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    fetchconversation();
  }, [currentPage]);

  const addpage = () => {
    setCurretPage(currentPage + 1);
  };

  const [PlaysendSound] = 'https://static.openreplay.com/tracker-assist/notification.mp3';

  const ConvoComponent = () => {
    dispatch(setConvoComp(false));
  };

  const send_message = async () => {
    const message_sender = MessageSender(config_id, chat_users, party_id, inputValue, email);
    await ChatSocket(email, message_sender);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      alert('enter a valid input');
      return;
    }
    send_message();
    setInputValue('');
    setShouldFetchConversation(true);
  };

  useEffect(() => {
    if (shouldFetchConversation) {
      fetchconversation();
      setShouldFetchConversation(false);
    }
  }, [shouldFetchConversation]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      {isLoading ? (
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
        />
      ) : (
        <>

          <span id='back-button' class="material-symbols-outlined" onClick={ConvoComponent}>
            arrow_back_ios
          </span>
          <div>
            <button onClick={addpage}>more ..</button>
            {conversation && conversation.map((item, index) => <p key={index}>{item.text}</p>)}
            <form onSubmit={sendChat}>
              <label>
                <input type="text" name="name" value={inputValue} onChange={handleInputChange} />
              </label>
              <button type="submit">Send</button>
              <ChatInput />
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ConvoList;
