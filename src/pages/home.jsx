import '../pages/Home.css'
import InstagramPost from '../Components/Card/Card';
import Friends from '../Components/Friends/Friends';
import Histories from '../Components/Histories/Histories';
import ImagesUtils from '../Utils/Hisories';
import { getPublications } from '../Services/getPublications';
import { useState, useEffect } from 'react';
export default function Home() {

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

    console.log(data);

    return (
        <div className='Container-Home'>
            <div className='nav'></div>
            <div className='container-Post'>
                <div className='histories'>
                    {
                        ImagesUtils.map((image) =>{
                            return (
                                <Histories src={image.url} key={image.id} />
                            );
                        })
                    }
                </div>
               
                {
                    data.map((postInstagram) =>{
                        return (
                            <InstagramPost 
                                imgPublication={postInstagram.image}
                                content={postInstagram.content}
                                username={postInstagram.user.username}
                                imgPerfil={postInstagram.user.imgPerfil}/>
                        );
                    })
                }
                
            </div>
            <Friends />
        </div>

    );
}