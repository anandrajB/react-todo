import React, { useEffect, useState } from 'react'
import url from '../utils/url'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'



const ChatList = () => {

  const [data , setData ] = useState([]);

  const email = useSelector((state) => state.baseData['email']);



  useEffect(() => {
    console.log("the email is in chat is " , email)
    const socketUrl = `wss://finflo-chat-klh7t.ondigitalocean.app/conversation/ws?email_id=${email}`
    
    const body = {
      "type":"CHAT_LIST",
      "email": email
    }

    const socket = new WebSocket(socketUrl);

    socket.addEventListener('open', (event) => {
      socket.send(JSON.stringify(body));
    });

    socket.addEventListener("message", (event) => {
      console.log("Message from server ", JSON.parse(event.data))
      console.log(event.data);
      setData(event.data['data']);
    })
    
  },[email])
  return (
    <div>
      <h1>this is chat</h1>
      {/* <ul class="todo-list">
      {data.map((item, index) => (
          <li class="todo-item">
            <label key = {index} value={item.data} for="todo1">{item.data}</label>
          </li>
        ))}
    </ul> */}
    </div>
  )
}

export default ChatList
