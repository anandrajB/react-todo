import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ChatList = () => {
  const [data, setData] = useState<any[]>([]);
  const convo_list = useSelector((state : any) => state.baseData['convo_list'][0]);


  useEffect(() => {
    setData(convo_list['data']);
  }, [convo_list]);


  

  return (
    
    <div>
      <ul className="todo-list">
        {data.map((item, index) => (
          <li className="todo-item" key={index}>
            <label htmlFor="todo1">{item.config_id}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
