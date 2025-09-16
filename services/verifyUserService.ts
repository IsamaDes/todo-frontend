import axiosInstance from "../utils/axiosInstance";

export default async function verifyUser(token: string) {
    try {
        const response = await axiosInstance.post("/auth/verify", { token });
        return response.data;
    } catch (err: unknown) {
        if (err instanceof Error) throw err;
        throw new Error("Unknown verification error");
    }

}