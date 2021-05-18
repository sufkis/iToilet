import axios from 'axios';



export async function convertToGoogleCeooding(street, city, country) {

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=+${street},${city},+${country}&key=${process.env.REACT_APP_GOOGLE_KEY}`

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

