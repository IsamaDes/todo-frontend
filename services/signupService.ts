const axios = require('axios');

const signup = async (email: string, password: string) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });
    return response.data;
}

export default signup;