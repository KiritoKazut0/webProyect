import axios from 'axios';

export const getInitialReactions = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:3000/publication/reaction-initial`, {id: userId},  {
            headers: {
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching initial reactions count:', error);
        throw error;
    }
};

export const getNewReactions = async (userId, idPublication) => {
    try {
        const token = localStorage.getItem('token');
        const data = {
            userId,
            idPublication,
            reaction: "love"
        };
        const response = await axios.get(`http://localhost:3000/publication/reaction`, data,  {
            headers: {
                'token': token
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error with long polling:', error);
        throw error;
    }
};


export const addReactions = async (userId, idPublication) => {
    try {
        const token = localStorage.getItem('token');
        const data = {
            userId,
            idPublication,
            reaction: "love"
        };
        const response = await axios.post(`http://localhost:3000/publication/reaction/add`, data, {
            headers: {
                'token': token
            }
        } );
        
        return response.data;
    } catch (error) {
        console.error('Error the add reaction', error);
        return error;
    }
}
