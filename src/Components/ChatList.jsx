import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, List } from 'antd';


const ChatList = () => {
  const [data, setData] = useState([]);
  const convo_list = useSelector((state) => state.baseData['convo_list'][0]);


  useEffect(() => {
    setData(convo_list['data']);
  }, [convo_list]);


  

  return (
    
    <div>
      <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={<a href="https://ant.design">{item.members}</a>}
          />
        </List.Item>
      )}
    />
    </div>
  );
};

export default ChatList;
