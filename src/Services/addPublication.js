import axios from "axios";


export const addPublications = (data) =>{
    return axios.post('http://localhost:3000/publication/', data)
    .then((response) => {
        return response.data
    })

    .catch((error) => {
        console.error('Error al agregar una publicaciones', error);
        throw error.response
    })
}



