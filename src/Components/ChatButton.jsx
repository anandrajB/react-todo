import React from 'react';
import { useDispatch } from 'react-redux';
import { setChatUsers, setConfigId, setConvoComp } from '../utils/slice';

const ChatButton = ({ shouldRenderButton, users }) => {
  const dispatch = useDispatch();

  const ConvComponent = () => {
    const config_id = '64be430ccac4e62378a1ae89';
    dispatch(setConfigId(config_id));
    dispatch(setConvoComp(true));
    dispatch(setChatUsers(users));
  };



  return (
    <div>
      {shouldRenderButton ? (
        <button
          type="button"
          className="base-button"
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
