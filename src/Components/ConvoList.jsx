import React from 'react'
import { useDispatch } from 'react-redux';
import { setConvoComp } from '../utils/slice';
const ConvoList = () => {


  const dispatch = useDispatch();

  const ConvoComponent = () => {
    console.log("here")
    dispatch(setConvoComp(false));
  }
  
  return (
    <div>
      <button onClick={ConvoComponent}>go back</button>
      <h1> this is a new conversation</h1>
    </div>
  )
}

export default ConvoList;
