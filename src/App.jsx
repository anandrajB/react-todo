import React from 'react';
import UserList from './Components/UserList';
import ChatList from './Components/ChatList';
import { Provider } from 'react-redux';
import store from './utils/store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <p className="text-3xl font-bold">kredibot</p>
        <UserList />
        <ChatList />
      </div>
    </Provider>
  );
};

export default App;
