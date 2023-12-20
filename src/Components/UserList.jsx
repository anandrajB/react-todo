import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ChatListData from './Axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ChatListData();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <label>Select a Name:</label>
      <select className='w-auto'>
        <option value="">Select Party</option>
        {users.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      <label>Select a User:</label>
      <select className='w-auto'>
        <option value="">Select User</option>
        {users.map((item, index) => (
          <option key={index} value={item.name}>
            {item.users}
          </option>
        ))}
      </select>

    </div>
  );
  
};
export default UserList;
