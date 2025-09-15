const axios = require('axios');

const login = async (email: string, password: string) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    return response.data;
}

export default login;