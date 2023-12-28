import { MutatingDots } from 'react-loader-spinner';


import React from 'react'

const Loader = () => {
  return (
    <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
          />
    
  )
}

export default Loader
