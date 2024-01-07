import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, List } from 'antd';
import ConvoList from './ConvoList';


const ChatList = () => {
  const [data, setData] = useState([]);
  const [item,setItem] = useState('');
  const [showcomp , setShowComp] = useState(false);
  const convo_list = useSelector((state) => state.baseData['convo_list'][0]);


  useEffect(() => {
    setData(convo_list['data']);
  }, [convo_list]);



  const handleTitleClick = (item) => {
    setShowComp(true);
    setItem(item);
  };
  

  return (
    
    <div>
      {showcomp ? (
        <ConvoList config_id={item['config_id']} all_users={item.members} logged_in_email={"krediq@gmail.com"}/>
      ) :(
        <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={<a onClick={() => handleTitleClick(item)}>{item.config_id}</a>}
            description={<p>{item.members.join(',')}</p>}
          />
        </List.Item>
      )}
    />
      )}
    </div>
  );
};

export default ChatList;
