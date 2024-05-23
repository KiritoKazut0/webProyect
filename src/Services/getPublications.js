import axios from "axios";

export const getPublications = () =>{
    return axios.get('http://localhost:3000/publication')
    .then((response) => {
        return response.data
    })

    .catch((error) => {
        console.error('Error al cargar las publicaciones', error);
        throw error.response
    })
}



