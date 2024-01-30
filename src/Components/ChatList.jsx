import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, List } from 'antd';
import ConvoList from './ConvoList';
import { setChatUsers, setConfigId, setConvoComp } from '../utils/slice';

const ChatList = () => {
  const [data, setData] = useState([]);
  const convo_list = useSelector((state) => state.baseData['convo_list'][0]);

  const dispatch = useDispatch();
  console.log(data);
  useEffect(() => {
    setData(convo_list['data']);
  }, [convo_list]);

  const handleTitleClick = (item) => {
    dispatch(setConfigId(item.config_id));
    dispatch(setConvoComp(true));
    dispatch(setChatUsers(item.members));
    console.log(item.members);
  };

  return (
    <div className="chatbox">
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <div className="list-item">
              <div className="item-content">
                <a onClick={() => handleTitleClick(item)}>{item.config_id}</a>
                <p>{item.members.map((email) => email.split('@')[0]).join(',')}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
