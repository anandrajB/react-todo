const ChatSocket = (email, body) => {
  const socketUrl = `wss://finflo-chat-klh7t.ondigitalocean.app/conversation/ws?email_id=${email}`;

  return new Promise((resolve, reject) => {
    const socket = new WebSocket(socketUrl);

    const handleSocketOpen = () => {
      socket.send(JSON.stringify(body));
    };

    const handleSocketMessage = (event) => {
      try {
        const data = event.data;
        socket.removeEventListener('open', handleSocketOpen);
        socket.removeEventListener('message', handleSocketMessage);
        resolve(JSON.parse(data));
        socket.close();
      } catch (e) {
        console.log(e);
        console.log('Something went wrong');
        reject(e);
      }
    };

    const handleSocketError = (errorEvent) => {
      console.error('WebSocket error:', errorEvent);
      reject(errorEvent);
    };

    const cleanup = () => {
      socket.removeEventListener('open', handleSocketOpen);
      socket.removeEventListener('message', handleSocketMessage);
      socket.removeEventListener('error', handleSocketError);
      socket.close();
    };

    socket.addEventListener('open', handleSocketOpen);
    socket.addEventListener('message', handleSocketMessage);
    socket.addEventListener('error', handleSocketError);

    window.addEventListener('beforeunload', cleanup);
  });
};

export default ChatSocket;
