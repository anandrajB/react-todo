import React, { useEffect } from 'react'
import url from '../utils/url'
import { useSelector } from 'react-redux'


const ChatList = () => {

  const email  = useSelector(
    (state) => state.baseData['email']
  )

  // const body = {
  //   "type" : "CHAT_LIST",
  //   "email" : email
  // }


  useEffect(() => {
    console.log("the email is in chat is " , email)
  },[])
  return (
    <div>
      <h1>this is chat</h1>
    </div>
  )
}

export default ChatList
