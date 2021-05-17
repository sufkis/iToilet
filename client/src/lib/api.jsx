import axios from 'axios';

export async function convertToGoogleCeooding(url) {
    const response = await axios.get(url);
    return response.data;
}