import axios from "axios";

export const addPublications = (data) => {
    const token = localStorage.getItem('token');

    return axios.post(
     
        'http://localhost:3000/publication/', 
        data, 
        {
            headers: {
                'token': token
            }
        }
    )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error('Error al agregar una publicación', error);
        throw error.response;
    });
}


