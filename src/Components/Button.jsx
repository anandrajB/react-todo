import React from 'react';
import { useDispatch } from 'react-redux';
import { setConvoComp } from '../utils/slice';

const Button = ({ shouldRenderButton }) => {
  const dispatch = useDispatch();

  const ConvComponent = () => {
    dispatch(setConvoComp(true));
  };

  return (
    <div>
      {shouldRenderButton ? (
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={ConvComponent}
        >
          Chat
        </button>
      ) : null}
    </div>
  );
};

export default Button;
