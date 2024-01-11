const ChatSocket = (email, body) => {
  const socketUrl = `wss://finflo-chat-klh7t.ondigitalocean.app/conversation/ws?email_id=${email}`;
  return new Promise((resolve) => {
    const socket = new WebSocket(socketUrl);
    console.log("the data is" , socket)
    console.dir(socket)
    socket.addEventListener('open', () => {
      console.log("socket is opened now ")
      socket.send(JSON.stringify(body));
    });

    const handleSocketMessage = (event) => {
      try{
        setTimeout(1000);
      const data = event.data;
      socket.removeEventListener('message', handleSocketMessage);
      socket.close();
      resolve(JSON.parse(data));
      }catch(e){
        console.log(e);
        console.log("something went wrong");
      }
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

export default ChatSocket;
