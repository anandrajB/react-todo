import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addData, addEmail, addPartyType, addConvoList , setConfigId } from './utils/slice';
import UserList from './Components/UserList';
import ChatList from './Components/ChatList';
import { MutatingDots } from 'react-loader-spinner';
import ChatlistData from './utils/Chatlist';
import ConvoList from './Components/ConvoList';
import CongifurationListData from './utils/Configuration';
import { Typography} from 'antd';


const App = ({ token, config_id, base_url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [partyType, setPartyType] = useState(null);
  const dispatch = useDispatch();
  const convo_comp = useSelector((state) => state.baseData['convo_comp']);
  const { Title } = Typography;
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const [email, fetchedPartyType, response] = await ChatlistData(token, base_url);

        const socketUrl = `wss://finflo-chat-klh7t.ondigitalocean.app/conversation/ws?email_id=${email}`;
        const socket = new WebSocket(socketUrl);
        const body = {
          type: 'CHAT_LIST',
          email: email,
        };

        socket.addEventListener('open', () => {
          socket.send(JSON.stringify(body));
        });

        socket.addEventListener("message", event => {
          console.log("Message from server ", event.data)
        });


        const convoListData = await CongifurationListData(email);
        // console.log(convoListData);
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

    fetchEmail();
  }, []);

  return (
    <div>
      {convo_comp ? (
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
          <Title>kredibot </Title>
          {partyType !== 'BANK' ? <UserList /> : null}
          <ChatList />
        </>
      )}
    </div>
  );
};

export default App;
