// services/websocketService.js
let socket;

export const connectWebSocket = (url) => {
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

export const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not open');
  }
};

export const onMessage = (callback) => {
  if (socket) {
    socket.onmessage = (event) => {
        
      const data = JSON.parse(event.data);
      console.log(data);
      callback(data);
    };
  } else {
    console.error('WebSocket is not initialized');
  }
};

export const closeWebSocket = () => {
  if (socket) {
    socket.close();
  }
};