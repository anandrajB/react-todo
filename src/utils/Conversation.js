const ConversationListData = (email) => {
  const socketUrl = `wss://finflo-chat-klh7t.ondigitalocean.app/conversation/ws?email_id=${email}`;
  
  const body = {
    type: 'CHAT_LIST',
    email: email,
  };

  return new Promise((resolve) => {
    const socket = new WebSocket(socketUrl);

    socket.addEventListener('open', () => {
      socket.send(JSON.stringify(body));
    });

    const handleSocketMessage = (event) => {
      const data = event.data;
      socket.removeEventListener('message', handleSocketMessage);
      socket.close();
      resolve(JSON.parse(data));
    };

    socket.addEventListener('message', handleSocketMessage);

    const cleanup = () => {
      socket.removeEventListener('message', handleSocketMessage);
      socket.close();
      resolve(null);
    };

    window.addEventListener('beforeunload', cleanup);
  });
};

export default ConversationListData;
