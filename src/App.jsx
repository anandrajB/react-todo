import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addData, addEmail, addPartyType, addConvoList, setConfigId } from './utils/slice';
import UserList from './Components/UserList';
import ChatList from './Components/ChatList';
import { MutatingDots } from 'react-loader-spinner';
import ChatlistData from './utils/Chatlist';
import ConvoList from './Components/ConvoList';
import CongifurationListData from './utils/Configuration';
import { Typography } from 'antd';



const App = ({ token, config_id, base_url }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [partyType, setPartyType] = useState(null);
  const dispatch = useDispatch();
  const convo_comp = useSelector((state) => state.baseData['convo_comp']);
  const [isSlowConnection, setSlowConnection] = useState(false);

  const Title = Typography;
  useEffect(() => {
    const handleNetworkChange = () => {
      const connection =
        navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      console.log(connection)
      if (connection) {
        const effectiveType = connection.effectiveType;
        if (effectiveType === 'slow-2g' || effectiveType === '2g')  {
          setSlowConnection(true);
          alert('Your network connection is slow. Please consider switching to a faster network.');
        } else {
          setSlowConnection(false);
        }
      }
      // else if (connection === undefined){
      //   alert('Your network connection is slow. Consider switching to a faster network .');
      // }
    };

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);

    handleNetworkChange();

    const fetchEmail = async () => {
      try {
        const [email, fetchedPartyType, response] = await ChatlistData(token, base_url);
        const socketUrl = `wss://finflo-chat-klh7t.ondigitalocean.app/conversation/ws?email_id=${email}`;
        const socket = new WebSocket(socketUrl);
        const body = {
          type: 'CHAT_LIST',
          email: email,
        };

        const convoListData = await CongifurationListData(email);
        console.log("the data is " , convoListData)
        // dispatch(addEmail(email));
        // dispatch(addData(response));
        // dispatch(addPartyType(fetchedPartyType));
        // dispatch(addConvoList(convoListData));
        // dispatch(setConfigId(config_id));
        // setPartyType(fetchedPartyType);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching email:', error);
      }
    };

    fetchEmail();

    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, [convo_comp]);

  return (
    <div>
      {/* {convo_comp ? (
        <ConvoList config_id={config_id} all_users={null} logged_in_email={null}/>
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
          <Title>Kredibot</Title>
          {partyType !== 'BANK' ? <UserList /> : null}
          <ChatList />
        </>
      )} */}
    </div>
  );
};

export default App;
