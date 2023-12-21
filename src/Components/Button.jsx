import React from 'react'

const Button = ({ shouldRenderButton }) => {
    return (
      <div>
        {shouldRenderButton ? (
          <button>Chat</button>
        ) : (
          null
        )}
      </div>
    );
  };
  
  export default Button;
