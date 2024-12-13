import axios from "axios";

const API_URL = "http://localhost:5000/api/services";

export const fetchServices = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addService = async (service) => {
    const response = await axios.post(API_URL, service);
    return response.data;
};

export const editService = async (id, updatedService) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedService);
    return response.data;
};

export const deleteService = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};