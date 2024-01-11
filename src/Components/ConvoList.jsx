import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConvoComp } from '../utils/slice';
import { MessageReceiver, MessageSender } from '../utils/Messager';
import { MutatingDots } from 'react-loader-spinner';
import ChatSocket from '../utils/ChatSocket';

const ConvoList = ({ config_id, all_users, logged_in_email, party_id }) => {
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurretPage] = useState(1);
  const [conversation, setConversation] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
      console.log('the message reci', message_receiver);
      const baseData = await ChatSocket(email, message_receiver);
      console.log('the base data is', baseData);
      console.log('the data is here');
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
    console.log('for here');
    const message_sender = MessageSender(config_id, chat_users, party_id, inputValue, email);
    console.log("the message is" , message_sender);
    await ChatSocket(email, message_sender);
    console.log('Before fetchconversation');
    fetchconversation();
    console.log('After fetchconversation');
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      alert('enter a valid input');
      return;
    }
    send_message();
    setInputValue('');
  };

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
          <button onClick={ConvoComponent}>Go back</button>
          <div>
            <button onClick={addpage}>more ..</button>
            {conversation && conversation.map((item, index) => <p key={index}>{item.text}</p>)}
            <form onSubmit={sendChat}>
              <label>
                <input type="text" name="name" value={inputValue} onChange={handleInputChange} />
              </label>
              <button type="submit">Send</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ConvoList;
