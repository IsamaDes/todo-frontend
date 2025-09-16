import axiosInstance from "../utils/axiosInstance";

const signup = async (name: string, email: string, password: string) => {
    const response = await axiosInstance.post('/auth/register', { name, email, password });
    return response.data;
}

export default signup;