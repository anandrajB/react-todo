import React from 'react';
import { useDispatch } from 'react-redux';
import { setConvoComp } from '../utils/slice';

const ChatButton = ({ shouldRenderButton }) => {
  const dispatch = useDispatch();

  const ConvComponent = () => {
    dispatch(setConvoComp(true));
  };

  return (
    <div>
      {shouldRenderButton ? (
        <button
          type="button"
          className="button-21"
          style={{ marginLeft: 10, marginTop: 4 }}
          onClick={ConvComponent}
        >
          Chat
        </button>
      ) : null}
    </div>

  );
};

export default ChatButton;
