import axios from 'axios';

const BaseUrl = `http://127.0.0.1:5000/`

// GOOGLE MAPS API FUNCTIONS

export async function convertToGoogleCeooding(url) {
    const response = await axios.get(url);
    return response.data;
}

// CUSTOMER FUNCTIONS

export async function getToilets() {
    // TODO
}

// PROVIDER FUNCTION

export async function postToilet(form) {
    // TODO
}

