import getHeaders from "@/common/getHeaders";
import { handleResponse } from "@/common/handleResponse";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const signup = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(formData),
        });
        const result = await handleResponse(response);
        return result;

    } catch (error) {
        throw error;
    }
};


export const login = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(formData),
        });
        const result = await handleResponse(response);
        localStorage.setItem('a', result.token);
        return result;

    } catch (error) {
        throw error;
    }
};

export const getProfileDetails = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/get-profile-details`, {
            method: 'GET',
            headers: getHeaders(),
        });
        const result = await handleResponse(response);
        return result;
    } catch (error) {
        throw error;
    }
};