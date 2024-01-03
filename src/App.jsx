import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './utils/store';
import { addData, addEmail, addPartyType, addConvoList } from './utils/slice';
import UserList from './Components/UserList';
import ChatList from './Components/ChatList';
import { MutatingDots } from 'react-loader-spinner';
import ChatlistData from './utils/Chatlist';
import ConversationListData from './utils/Conversation';
import ConvoList from './Components/ConvoList';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [partyType, setPartyType] = useState(null);
  const dispatch = useDispatch();
  const convo_comp = useSelector((state) => state.baseData['convo_comp']);
  


  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const [email, fetchedPartyType, response] = await ChatlistData();
        dispatch(addEmail(email));
        dispatch(addData(response));
        dispatch(addPartyType(fetchedPartyType));
        // Wait for ConversationListData to resolve before setting partyType
        const convoListData = await ConversationListData(email);
        dispatch(addConvoList(convoListData));
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
        <ConvoList />
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
          <p className="text-3xl font-bold">kredibot</p>
          {partyType !== 'BANK' ? <UserList /> : null}
          <ChatList />
        </>
      )}
    </div>
  );
};

export default App;
