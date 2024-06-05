import React, { useState, useEffect, useMemo, useCallback } from 'react';
import InstagramPost from '../../Components/Card/Card';
import Friends from '../../Components/Friends/Friends';
import Histories from '../../Components/Histories/Histories';
import ImagesUtils from '../../Utils/Hisories';
import { getPublications } from '../../Services/getPublications';
import Nav from '../../Components/Nav/Nav';
import { useWebSocket } from '../../hooks/useWebsocked';
import '../Home/Home.css'

export default function Home() {
  const [data, setData] = useState([]);
  const interval = 5000;

  //short polling
  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const getdata = await getPublications();
        setData(getdata.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAndSetData();
    const intervalGet = setInterval(fetchAndSetData, interval);
    return () => clearInterval(intervalGet);
  }, [interval]);

  // websocked

  const { isConnected, sendMessage } = useWebSocket('ws://localhost:3000/');
  const [comments, setComments] = useState([]);

  const handleNewComment = useCallback((data) => {
    setComments((prevComments) => [...prevComments, data.data]);
  }, []);

  const handleGetComments = useCallback((data) => {
    setComments(data.data);
  }, []);

  const memoizedComments = useMemo(() => comments, [comments]);

  // Enviar un nuevo comentario
  const handleSendComment = useCallback(() => {
    const publicationId = '6660c69d06c7229388cc3396';
    const comment = 'Nuevo comentario';
    const userId = 'tu-id-de-usuario';

    const message = {
      publicationId,
      comment,
      userId,
      accion: 'postMessage',
    };

    sendMessage(message);
  }, [sendMessage]);

  // Obtener comentarios de una publicación
  const handleGetCommentsClick = useCallback(() => {
    const publicationId = '6660c69d06c7229388cc3396';

    const message = {
      publicationId,
      accion: 'getcomments',
    };

    sendMessage(message);
  }, [sendMessage]);





  return (
    <div className='Container-Home'>
      <div className='nav'>
        <Nav />
      </div>
      <div className='container-Post'>
        <div className='histories'>
          {ImagesUtils.map((image) => (
            <Histories src={image.url} key={image.id} />
          ))}
        </div>
        {data.map((postInstagram, index) => (
          <InstagramPost
          key={index}
          imgPublication={postInstagram.image}
          content={postInstagram.content}
          username={postInstagram.user.username}
          imgPerfil={postInstagram.user.imgPerfil}
          
        />
        ))}
      </div>
      <Friends />
    </div>
  );
}