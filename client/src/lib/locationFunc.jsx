import { convertToGoogleCeooding } from "./api";

export async function processManuelLocation(userCity, userCountry) {


    if (userCountry !== "" && userCity !== "") {
        const city = userCity;
        const country = userCountry;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=+${city},+${country}&key=${process.env.REACT_APP_GOOGLE_KEY}`
        try {
            const results = await convertToGoogleCeooding(url)
            if (results.status === "OK") {
               const result = getUserCoords(results.results)
               return result;
            } else {
                console.log('Please revise location fields and resubmit')
            }
        } catch (err) {
            console.error(err)
        }
   
    } else {
        console.log('Please make sure you provide all necessary fields')
    }
}


function getUserCoords(googleRes) {
    let lat = googleRes[0].geometry.location.lat;
    let lng = googleRes[0].geometry.location.lng;
    
    return ({lat, lng})
  }
  
