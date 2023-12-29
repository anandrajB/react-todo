import React, { useEffect, useState } from 'react'
import url from '../utils/url'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'



const ChatList = () => {

  const [data , setData ] = useState([]);

  const email = useSelector((state) => state.baseData['email']);



  useEffect(() => {
    const socketUrl = `wss://finflo-chat-klh7t.ondigitalocean.app/conversation/ws?email_id=${email}`
    
    const body = {
      "type":"CHAT_LIST",
      "email": email
    }

    const socket = new WebSocket(socketUrl);
    

    socket.addEventListener('open', (event) => {
      socket.send(JSON.stringify(body));
    });

  
    const cleanup = () => {
      socket.removeEventListener('message', handleSocketMessage);
      socket.close();
    };

    window.addEventListener('beforeunload', cleanup);


    socket.addEventListener("message", (event) => {
      console.log(event.data);
      setData(event.data['data']);
    })
    
    return () => {
      window.removeEventListener('beforeunload', cleanup);
      cleanup();
    };


  },[email])
  return (
    <div>
      <h1>this is chat</h1>
      <ul className="todo-list">
      {/* {data['data'].map((item, index) => (
          <li class="todo-item">
            <label key = {index} value={item.id} for="todo1">{item.config_id}</label>
          </li>
        ))} */}
    </ul>
    </div>
  )
}

export default ChatList
