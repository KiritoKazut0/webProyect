import { useState, useEffect, useCallback } from 'react';
import ConexionSocked from '../Services/sockedConections';

const useComments = (userId, publicationId) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');


  useEffect(() => {
    if (!ConexionSocked.ws) {
      ConexionSocked.connect('ws://localhost:3000');
      ConexionSocked.setOnMessageCallback(handleMessageReceived);
    }
  }, []);

  const handleMessageReceived = useCallback((data) => {
    
    if (data.event === 'getcomments') {
      if (Array.isArray(data.data.comments)) {

        setComments((prevComments) => {
          const updatedComments = [...prevComments, ...data.data.comments];
          return updatedComments;
        });
      } else {
        console.error('getcomments data.comments is not an array:', data.data.comments);
      }
    } else if (data.event === 'newComment') {
      setComments((prevComments) => {
        const updatedComments = [...prevComments, data.data];
       
        return updatedComments;
      });
    }
  }, []);

  const handleInputChange = useCallback((e) => {
    setNewComment(e.target.value);
  }, []);

  const fetchComments = useCallback(() => {
    
    ConexionSocked.sendMessage({ accion: 'getcomments', publicationId });
  }, [publicationId]);

  const postComment = useCallback(() => {
    ConexionSocked.sendMessage({ accion: 'postMessage', publicationId, userId, comment: newComment });
    setNewComment('');
  }, [publicationId, userId, newComment]);

  return { handleInputChange, fetchComments, postComment, comments, newComment };
};

export default useComments;