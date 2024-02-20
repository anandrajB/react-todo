# Kredibot

A node SDK tailored for react applications enabling chatbot interface with banks and customers within the krediq ecosystem and enabling a end to end communication within parties . 

<img src="chatlist.png" alt="Chat App Screenshot" height="500">   <img src="chatroom.png" alt="Chat App Screenshot" height="500">



## Features

- Real-time messaging: Users can send and receive messages instantly.
- Easy integrations for multiple clients .
- Automatic chat suggesstions .

## Technologies Used

- React
- AntDesign
- Vite


## Installation locally

To install and run the project locally, follow these steps:

1. Clone the repo 
2. Navigate to the project directory: `cd kredibot`
3. 
   ```bash
   - npm install
   - npm run dev
   ```


## For application integration

1. install the package from [npm](https://www.npmjs.com/package/kredibot)


```bash
npm i kredibot
```

2. Add the Kredibot component to your jsx file and configure the following 
- token
- logged in party id
- config id 
- backend url 

3. 

   ```node
      import { kredibot } from 'kredibot'; 
      
      <kredibot token="token my-auth-token"
      config_id="current-config-id"
      base_url="mybackend-url"
      party_id="party id in str or int ">
   ```

   