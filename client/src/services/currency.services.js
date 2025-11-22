import getHeaders from "../../common/getHeaders";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCurrencyList = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/currencies`, {
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch currency list:', error);
        throw error;
    }
}
