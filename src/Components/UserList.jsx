import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ChatListData from './Axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [data , setData] = useState([]);
  const [party, setParty] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ChatListData();
        console.log(response);
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const getPartyUsers = (party_name) => {
    const selectedParty = data.find(item => item.name === party_name);
    console.log("Selected party data:", selectedParty);
    setUsers(selectedParty?.users || []);
  };
  
  const selectParty = (event) => {
    const selectedPartyName = event.target?.value || '';
    console.log("Selected party name:", selectedPartyName);
    setParty(selectedPartyName);
    getPartyUsers(selectedPartyName);
  };


  return (
    <div>
      <label>Select a Name:</label>
      <select className='w-auto' value ={party} onChange={selectParty}>
        <option value="">Select Party</option>
        {data.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      <label>Select a User:</label>
      <select className='w-auto' >
        <option value="">Select User</option>
        {users.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

    </div>
  );
  
};
export default UserList;
