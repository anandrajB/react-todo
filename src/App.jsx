import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addData, addEmail, addPartyType, addConvoList, setConfigId } from './utils/slice';
import UserList from './Components/UserList';
import ChatList from './Components/ChatList';
import { MutatingDots } from 'react-loader-spinner';
import ChatlistData from './utils/Chatlist';
import ConvoList from './Components/ConvoList';
import { Typography } from 'antd';
import ChatSocket from './utils/ChatSocket';
import chatbotIcon from './assets/chatbot.png';

const App = ({ token, config_id, base_url, party_id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [partyType, setPartyType] = useState(null);
  const dispatch = useDispatch();
  const convo_comp = useSelector((state) => state.baseData['convo_comp']);
  const { Title } = Typography;

  const fetchData = async () => {
    try {
      const [email, fetchedPartyType, response] = await ChatlistData(token, base_url);

      const socketUrl = `wss://finflo-chat-klh7t.ondigitalocean.app/conversation/ws?email_id=${email}`;
      const socket = new WebSocket(socketUrl);
      const body = {
        type: 'CHAT_LIST',
        email: email,
      };

      console.log(body);

      socket.addEventListener('open', () => {
        socket.send(JSON.stringify(body));
      });

      socket.addEventListener('message', (event) => {
        console.log('Message from server ', event.data);
      });

      const convoListData = await ChatSocket(email, body);
      dispatch(addEmail(email));
      dispatch(addData(response));
      dispatch(addPartyType(fetchedPartyType));
      dispatch(addConvoList(convoListData));
      dispatch(setConfigId(config_id));
      setPartyType(fetchedPartyType);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error fetching email:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!convo_comp) {
      fetchData();
    }
  }, [convo_comp]);

  const [userMessage, setUserMessage] = useState('');
  const [inputInitHeight, setInputInitHeight] = useState(0);

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
      {convo_comp ? (
        <ConvoList config_id={config_id} all_users={null} logged_in_email={null} party_id={party_id} />
      ) : isLoading ? (
        <MutatingDots
          visible={true}
          height={100}
          width={100}
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius={12.5}
          ariaLabel="mutating-dots-loading"
        />
      ) : (
        <>
          <Title>kredibot </Title>
          {partyType !== 'BANK' ? <UserList /> : null}
          <ChatList />
        </>
      )}
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
        <ChatList />
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

export default App;
