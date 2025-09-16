import axiosInstance from "../utils/axiosInstance";

const login = async (email: string, password: string) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem("token", token);
    return response.data;
}

export default login;