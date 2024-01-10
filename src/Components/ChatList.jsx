import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, List } from 'antd';
import ConvoList from './ConvoList';
import { setChatUsers, setConfigId, setConvoComp } from '../utils/slice';

const ChatList = () => {
  const [data, setData] = useState([]);
  const convo_list = useSelector((state) => state.baseData['convo_list'][0]);

  const dispatch = useDispatch();

  useEffect(() => {
    setData(convo_list['data']);
  }, [convo_list]);

  const handleTitleClick = (item) => {
    console.log(item);
    dispatch(setConfigId(item.config_id));
    dispatch(setConvoComp(true));
    dispatch(setChatUsers(item.members));
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://api.dicebear.com/7.x/shapes/svg?seed=${index}`} />}
              title={<a onClick={() => handleTitleClick(item)}>{item.config_id}</a>}
              description={<p>{item.members.join(',')}</p>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ChatList;
