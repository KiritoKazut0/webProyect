import { useState, useEffect } from "react";
import {
    onMessage,
    connectWebSocket,
    sendMessage,
    closeWebSocket
} from "../Services/sockedConections"



const useWebSocketComments = (publicationId, userId) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
  
    useEffect(() => {
      // Conectar al WebSocket
      connectWebSocket('ws://localhost:3000');
  
      // Obtener comentarios iniciales
      sendMessage({ publicationId, accion: 'getcomments' });
  
      // Manejar mensajes entrantes
      onMessage((data) => {
        if (data.event === 'getcomments') {
            console.log(data);
            console.log(data.data);
            
          setComments(data.data);
        } else {
          setComments((prevComments) => [...prevComments, data]);
        }
      });
  
      // Limpiar la conexión al desmontar el componente
      return () => {
        closeWebSocket();
      };
    }, [publicationId]);
  
    const handleSendComment = () => {
      const newComment = {
        publicationId,
        comment,
        userId,
        accion: 'postMessage'
      };
      console.log(newComment);
      sendMessage(newComment);
      setComment('');
      
    };
  
    return {
      comments,
      comment,
      setComment,
      handleSendComment
    };
  };
  
  export default useWebSocketComments;