import { useState, useEffect, useCallback, useMemo } from 'react';

export const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleNewComment = useCallback((data) => {
    // Manejar el evento 'newComment' con los datos de comentarios recibidos
    console.log('Nuevo comentario:', data.data);
  }, []);

  const handleGetComments = useCallback((data) => {
    // Manejar el evento 'getcomments' con los datos de comentarios recibidos
    console.log('Comentarios obtenidos:', data.data);
  }, []);

  const handleError = useCallback((error) => {
    // Manejar errores recibidos del servidor
    console.error('Error del servidor:', error);
  }, []);

  const connect = useCallback(() => {
    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      setIsConnected(true);
      console.log('Conexión WebSocket abierta');
    };

    newSocket.onclose = () => {
      setIsConnected(false);
      console.log('Conexión WebSocket cerrada');
    };

    newSocket.onerror = (error) => {
      console.error('Error en WebSocket:', error);
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === 'newComment') {
        handleNewComment(data);
      } else if (data.event === 'getcomments') {
        handleGetComments(data);
      } else if (data.error) {
        handleError(data.error);
      }
    };

    setSocket(newSocket);
  }, [url, handleNewComment, handleGetComments, handleError]);

  useEffect(() => {
    connect();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connect]);

  const sendMessage = useCallback(
    (message) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      }
    },
    [socket]
  );

  return { isConnected, sendMessage };
};
