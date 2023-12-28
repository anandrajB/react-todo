import React from 'react';
import { useState, useEffect } from 'react';
import ChatListData from '../utils/Axios';
import { addEmail} from '../utils/slice';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';



const UserList = () => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [party, setParty] = useState();
  const [renderbutton ,  setRenderButton] = useState(false);
  const [selecteduser , setSelecteduser] = useState([]);
  
  
  // const dispatch = useDispatch();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [email , party_type , response] = await ChatListData();
        setData(response);
      } catch (error) {ssx
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const getPartyUsers = (party_name) => {
    const selectedParty = data.find((item) => item.name === party_name);
    setUsers(selectedParty?.users || []);
  };

  const selectParty = (event) => {
    const selectedPartyName = event.target?.value || '';
    setParty(selectedPartyName);
    getPartyUsers(selectedPartyName);
  };

  const selectUser = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelecteduser(selectedOptions);
    setRenderButton(selectedOptions.some((item) => item !== ""));
  };

  return (
    <div>
      <label>Select a Name:</label>
      <select className="w-auto" value={party} onChange={selectParty}>
        <option value="" selected disabled hidden>
          Select Party
        </option>
        {data.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      <label>Select a User:</label>
      <select className="w-auto" multiple value={selecteduser} onChange={selectUser}>
        <option value="" selected disabled hidden>
          Select User
        </option>
        {users.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <Button shouldRenderButton={renderbutton} />
    </div>
  );
};
export default UserList;
