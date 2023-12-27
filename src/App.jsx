import React, { useEffect, useState } from 'react'; 
import { Provider, useSelector } from 'react-redux';
import store from './utils/store';
import ChatListData from './utils/Axios';
import { addData, addEmail, addPartyType } from './utils/slice';
import UserList from './Components/UserList';
import ChatList from './Components/ChatList';

const App = () => {

  const [PartyType , setPartyType] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const [email , party_type , response ] = await ChatListData();
        store.dispatch(addEmail(email));
        store.dispatch(addData(response));
        store.dispatch(addPartyType(party_type));
        setPartyType(party_type);
      } catch (error) {
        console.error('Error fetching email:', error);
      }
    };
    fetchEmail();
  }, []);


  return (
    <Provider store={store}>
      <div>
        <p className="text-3xl font-bold">kredibot</p>
        {PartyType !== 'BANK' ? <UserList /> : null}
        <ChatList />
      </div>
    </Provider>
  );
};

export default App;
