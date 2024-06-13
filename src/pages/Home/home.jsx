import React, { useState, useEffect, useMemo, useCallback } from 'react';
import InstagramPost from '../../Components/Card/Card';
import Friends from '../../Components/Friends/Friends';
import Histories from '../../Components/Histories/Histories';
import ImagesUtils from '../../Utils/Hisories';
import { getPublications } from '../../Services/getPublications';
import Nav from '../../Components/Nav/Nav';
import '../Home/Home.css'
import {WebSocketProvider} from "../../contexts/SocketContext.jsx"

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


  

  return (
    <WebSocketProvider>
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
          publicationId={postInstagram._id}
        />
        ))}
      </div>
      <Friends />
    </div>
    </WebSocketProvider>
  );
}