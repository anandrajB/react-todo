import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import store from './utils/store';
import { addData, addEmail, addPartyType , addConvoList } from './utils/slice';
import UserList from './Components/UserList';
import ChatList from './Components/ChatList';
import { MutatingDots } from 'react-loader-spinner';
import ChatlistData from './utils/Chatlist';
import ConversationListData from './utils/Conversation';


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [partyType, setPartyType] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const [email, fetchedPartyType, response] = await ChatlistData();
        store.dispatch(addEmail(email));
        store.dispatch(addData(response));
        store.dispatch(addPartyType(fetchedPartyType));
        store.dispatch(addConvoList(await ConversationListData(email)));
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
    <Provider store={store}>
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
            <p className="text-3xl font-bold">kredibot</p>
            {partyType !== 'BANK' ? <UserList /> : null}
            <ChatList />
          </>
        )}
      </div>
    </Provider>
  );
};

export default App;
