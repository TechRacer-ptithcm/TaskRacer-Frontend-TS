import axios from "@/lib/axios.ts";

const API_URL = import.meta.env.VITE_API_URL;


export const getContributions = async () => {
    const response = await axios.get(`${API_URL}dashboard/contribution`);
    return response.data;
};
