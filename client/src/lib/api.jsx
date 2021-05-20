import axios from 'axios';

const Baseurl = process.env.REACT_APP_SERVER_URL

// LAT LNG conversion

const headers = {
   headeres: 'Content-Type: multipart/form-data'
}

export async function convertToGoogleCeooding(street, city, country) {

    const url = `https:/maps.googleapis.com/maps/api/geocode/json?address=+${street},${city},+${country}&key=${process.env.REACT_APP_GOOGLE_KEY}`

    const response = await axios.get(url);
    return response.data;
}

// LOGIN && SIGNUP

export async function signUpRegistration(newUser) {
    const response = await axios.post(`http://${Baseurl}/user`, newUser);
    return response.data;
}



//  CUSTOMER FUNCTIONS

export async function getToiletsByLocation(query) {
    const response = await axios.get(`http://${Baseurl}/toilets`, query)
    return response.data;

}

export async function getOneToilet(query) {
    const response = await axios.get(`http://${Baseurl}/toilets/`, query)
    return response.data;
}

export async function getToiletReview(toiletId) {
    const response = await axios.get(`http://${Baseurl}/reviews/${toiletId}`);
    return response.data;

}

export async function createNewReview(review) {
    const response = await axios.post(`http://${Baseurl}/reviews/`, review)
    return response;
}

export async function updateReview(review) {
    const response = await axios.put(`http://${Baseurl}/reviews/${review.reviewId}`, review)
    return response.data;
}

export async function deleteReview(reviewId) {
    const response = await axios.delete(`http://${Baseurl}/reviews/${reviewId}`);
    return response.data;
}

// { headers: { "Content-Type": "multipart/form-data" }}
// PROVIDER FUNCTION

export async function createNewToilet(toiletItem) {
    // TODO
    const response = await axios.post(`http://${Baseurl}/toilets/`, toiletItem, { headers: { "Content-Type": "multipart/form-data" }})
    return response.data;
}

export async function updateToilet(toiletId, toiletItem, file) {
    const response = await axios.put(`http://${Baseurl}/toilets/${toiletId}`, toiletItem, file)
    return response.data;
}

export async function deleteToilet(toiletId) {
    const response = await axios.delete(`http://${Baseurl}/toilets/${toiletId}`)
    return response.data;
}




