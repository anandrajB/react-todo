import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
              <div className="list-item" onClick={() => handleTitleClick(item)}>
                <div className="item-content">
                  <div className='item-profile'>
                    <img style={{ borderRadius: 50, borderStyle: 'ridge' }} src={`https://api.dicebear.com/7.x/personas/svg?seed=${index}`} alt="avatar" />

                  </div>
                  <div className='item-content-2'>
                    <a style={{ paddingTop: 5, fontSize: 16, fontWeight: 500 }} onClick={() => handleTitleClick(item)}>{item.config_id}</a>
                    <p className='user-gmail'>{item.members.map((email) => email.split('@')[0]).join(',')}</p>

                  </div>

                  {
                    item.unread_msgs != 0 ? <p className='unread-message'>{item.unread_msgs}</p> : null
                  }
                  
                </div>
              </div>
            </li>

          ))}
        </ul>
      )
      }
    </div >
  );
};

export default ChatList;
