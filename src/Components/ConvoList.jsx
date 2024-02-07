import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConvoComp } from '../utils/slice';
import { MessageReceiver, MessageSender } from '../utils/Messager';
import { RotatingLines } from 'react-loader-spinner';
import ChatSocket from '../utils/ChatSocket';

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
      console.log('conversation:', conversation, email);
    } catch (error) {
      console.error('Error in fetchconversation:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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







  const [inputInitHeight, setInputInitHeight] = useState(0);



  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = `${inputInitHeight}px`;
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };



  return (
    <div className='convo-list'>
      {isLoading ? (
        <div className='loader'>
          < RotatingLines
            visible={true}
            height="50"
            width="50"
            color="grey"
            strokeWidth="2"
            animationDuration="0.10"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          <div className='convo-list-header'>
            <span id='back-button' className="material-symbols-outlined" onClick={ConvoComponent}>
              arrow_back
            </span>

            <button className="button-21" onClick={addpage} role="button">?</button>
          </div>


          <div className='txt-msg-div'>
            {conversation &&
              conversation.map((item, index) => (
                <div
                  className={`text-message ${item.sender === email ? 'text-message-right' : 'text-message-left'
                    }`}
                  key={index}
                >

                  {item.text}
                  {
                    item.sender === email ? null : <p className='txt-msg-sender'>{item.sender}</p>
                  }
                  <p className='txt-msg-time'>{item.time}</p>
                </div>
              ))}
          </div>

          <div className="chat-input">
            <textarea
              placeholder="Enter a message..."
              spellCheck="false"
              required
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            ></textarea>
            <span id="send-btn" className="material-symbols-rounded" onClick={sendChat}>
              send
            </span>
          </div>
        </>
      )
      }
    </div >
  );
};

export default ConvoList;
