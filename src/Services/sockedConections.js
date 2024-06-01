class WebSocketService {
  constructor() {
    this.ws = null;
    this.onMessageCallback = null;
  }

  connect(url) {
    this.ws = new WebSocket(url);
    this.ws.onopen = this.onOpen;
    this.ws.onmessage = this.onMessage;
    this.ws.onerror = this.onError;
    this.ws.onclose = this.onClose;
  }

  onOpen = () => {
    console.log('Conectado al servidor WebSocket');
  };

  onMessage = (event) => {
    const data = JSON.parse(event.data);
    if (this.onMessageCallback) {
      this.onMessageCallback(data);
    }
  };

  onError = (error) => {
    console.error('WebSocket error:', error);
  };

  onClose = () => {
    console.log('Desconectado del servidor WebSocket');
  };

  sendMessage = (message) => {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket no está conectado');
    }
  };

  setOnMessageCallback = (callback) => {
    this.onMessageCallback = callback;
  };
}

const ConexionSocked = new WebSocketService();
export default ConexionSocked;