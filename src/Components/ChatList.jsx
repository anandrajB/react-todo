import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, List } from 'antd';
import ConvoList from './ConvoList';
import { setChatUsers, setConfigId, setConvoComp } from '../utils/slice';

const ChatList = () => {
  const [data, setData] = useState([]);
  const convo_list = useSelector((state) => state.baseData['convo_list'][0]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setData(convo_list['data']);
    if (typeof convo_list['data'] === 'object') {
      setIsLoading(false);
    }
  }, [convo_list]);

  const handleTitleClick = (item) => {
    dispatch(setConfigId(item.config_id));
    dispatch(setConvoComp(true));
    dispatch(setChatUsers(item.members));
  };

  return (
    <div className="chatbox">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <div className="list-item">
                <div className="item-content">
                  <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${index}`} alt="avatar" />
                  <a onClick={() => handleTitleClick(item)}>{item.config_id}</a>
                  <p>{item.members.map((email) => email.split('@')[0]).join(',')}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
