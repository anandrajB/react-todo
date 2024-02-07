import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChatUsers } from '../utils/slice';
import { Select } from 'antd';
import ChatButton from './ChatButton';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [party, setParty] = useState();
  const [renderbutton, setRenderButton] = useState(false);
  const [selecteduser, setSelecteduser] = useState([]);
  const { Option } = Select;
  const dispatch = useDispatch();

  const sender_email = useSelector((state) => state.baseData['email']);

  const responsedata = useSelector((state) => state.baseData['data'][0]);

  const getPartyUsers = (party_name) => {
    const selectedParty = responsedata.find((item) => item.name === party_name);
    setUsers(selectedParty?.users || []);
  };

  const selectParty = (event) => {
    setSelecteduser([]);
    const selectedPartyName = event || '';
    setParty(selectedPartyName);
    getPartyUsers(selectedPartyName);
  };

  const selectUser = (event) => {
    const selectedOptions = Array.from(event, (option) => option);
    setSelecteduser(selectedOptions);
    setRenderButton(selectedOptions.some((item) => item !== ''));
    dispatch(setChatUsers([...selectedOptions, sender_email]));
  };

  useEffect(() => { console.log(party) }
    , [])

  return (
    <div className='chat-users-select'>
      <div className='select-party'>
        {/* <label>party</label> */}
        <Select
          className="base-party-list"
          showSearch
          value={party}
          placeholder="Select Party"
          optionFilterProp="children"
          onChange={selectParty}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {responsedata.map((item, index) => (
            <Option key={index} value={item.name}>
              {item.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className='select-user'>
        <Select className={party ? 'user-list' : 'base-user-list'} mode="multiple" placeholder="Select User" value={selecteduser} onChange={selectUser}>
          {users.map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>

      <ChatButton shouldRenderButton={renderbutton} />
    </div>
  );
};
export default UserList;
