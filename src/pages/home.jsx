import PostPublication from "../components/CardUi/CadUi"
import '../pages/Home.css'
import React, { useState, useEffect } from 'react';
import { getPublications } from "../Services/getPublications";


export default function Home() {

    //short polling
    const [data, setData] = useState([]);
   

    const interval = 5000;

    useEffect (() => {
        const fetchAndSetData = async () => {
            try {
                const getdata = await getPublications();
                setData(getdata.data)
            } catch (error) {
                console.log(error);
            }
        };

        fetchAndSetData();

        const intervalGet = setInterval(fetchAndSetData, interval );
        return () => clearInterval (intervalGet)

    }, [interval]);

    


   

    return (
        <div className="container-Home">
            {data.map((post, index) => (
                <PostPublication
                    key={index}
                    username={post.user.username}
                    perfil={post.user.imgPerfil}
                    imgPublication={post.image}
                    content={post.content}
                   idUser={post.user._id}
                   idPublication={post._id}
                />
            ))}
        </div>
    );
}

