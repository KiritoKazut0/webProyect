import  { createContext, useState, useEffect, useCallback } from 'react';

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [comments, setComments] = useState({});

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:3000');

    newSocket.onopen = () => {
      console.log('WebSocket conectado');
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      

      switch (data.event) {
        case 'newComment':
          setComments((prevComments) => {
            const { publicationId, comments } = data.data;
        
           
            const existingComments = prevComments[publicationId] || [];
        
            
            const newComments = comments.filter(newComment => (
              !existingComments.some(existingComment => (
                existingComment.content === newComment.content &&
                existingComment.date === newComment.date 
              ))
            ));
        
        
            if (newComments.length > 0) {
              return {
                ...prevComments,
                [publicationId]: [
                  ...existingComments,
                  ...newComments,
                ],
              };
            } else {
              return prevComments;
            }
          });
          break;
        case 'getcomments':
          setComments((prevComments) => ({
            ...prevComments,
            [data.data.publicationId]: data.data.comments.map(comment => ({
              user: comment.user,
              content: comment.content,
              date: comment.date
            })),
          }));
          break; 
       
          setComments((prevComments) => ({
            ...prevComments,
            [data.data.publicationId]: data.data.comments,
          }));
          break;
       
        default:
          console.log('Mensaje inesperado:', data);
      }
    };

    newSocket.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
    };

    newSocket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = useCallback((message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket no está conectado');
    }
  }, [socket]);

  const getComments = useCallback((publicationId) => {
    const getCommentsMessage = {
      publicationId,
      accion: 'getcomments',
    };
    sendMessage(getCommentsMessage);
  }, [sendMessage]);

  const postComment = useCallback(
    (comment, userId, publicationId) => {
      const postCommentMessage = {
        publicationId,
        comment,
        userId,
        accion: 'postMessage',
      };
      sendMessage(postCommentMessage);
    },
    [sendMessage]
  );

  const value = { socket, comments, getComments, postComment };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};





//   "event": "newComment",
//   "data": {
//       "publicationId": "6668ee0ab6516ace439e55f2",
//       "comments": [
//           {
//               "user": {
//                   "_id": "664e917175ccc74bcd3e82e1",
//                   "username": "Kirito Kazuto"
//               },
//               "content": "si llego8",
//               "date": "2024-06-12T06:59:04.938Z"
//           },
//           {
//               "user": {
//                   "_id": "664e917175ccc74bcd3e82e1",
//                   "username": "Kirito Kazuto"
//               },
//               "content": "si llego9",
//               "date": "2024-06-12T07:00:42.007Z"
//           },
//           {
//               "user": {
//                   "_id": "664e917175ccc74bcd3e82e1",
//                   "username": "Kirito Kazuto"
//               },
//               "content": "si llego99",
//               "date": "2024-06-12T07:02:26.397Z"
//           },
//           {
//               "user": {
//                   "_id": "664e917175ccc74bcd3e82e1",
//                   "username": "Kirito Kazuto"
//               },
//               "content": "si llego98",
//               "date": "2024-06-12T07:17:06.414Z"
//           },
//           {
//               "user": {
//                   "_id": "664e917175ccc74bcd3e82e1",
//                   "username": "Kirito Kazuto"
//               },
//               "content": "si llego97",
//               "date": "2024-06-12T07:21:55.169Z"
//           },
//           {
//               "user": null,
//               "content": "si llego we",
//               "date": "2024-06-12T15:30:51.496Z"
//           },
//           {
//               "user": null,
//               "content": "si llego05555",
//               "date": "2024-06-12T15:51:47.950Z"
//           },
//           {
//               "user": null,
//               "content": "si llego055556",
//               "date": "2024-06-12T16:13:40.335Z"
//           },
//           {
//               "user": null,
//               "content": "si 6",
//               "date": "2024-06-13T01:53:26.359Z"
//           },
//           {
//               "user": "66494a29ddcf4e120c9ce2d4",
//               "content": "si we",
//               "date": "2024-06-13T02:07:32.697Z"
//           }
//       ],
//       "numComments": 10
//   }
// }