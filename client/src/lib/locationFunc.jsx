import { convertToGoogleCeooding } from "./api";

export async function processManuelLocation(userCity, userCountry) {

    console.log(userCity, userCountry)

    if (userCountry !== "" && userCity !== "") {
        const city = userCity;
        const country = userCountry;
        try {
            const results = await convertToGoogleCeooding(city, country)
            if (results.status === "OK") {
               const result = getUserCoords(results.results)
               console.log(result)
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
  
