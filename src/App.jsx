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
import Chatbot from './Components/Chatbot';

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

  return (
    <div>
      <h1>Your App</h1>
      <Chatbot />
    </div>
  );
};

export default App;
