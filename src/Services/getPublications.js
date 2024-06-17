import axios from "axios";

export const getPublications = () => {
    const token = localStorage.getItem('token');

    return axios.get('http://localhost:3000/publication', {
        headers: {
            'token': token
        }
    })
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error('Error al cargar las publicaciones', error);
        throw error.response;
    });
}




