import axios from "axios";

const LoginUser = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/singIn', credentials);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default LoginUser;