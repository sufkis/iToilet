import { useAuth } from "../contexts/Auth";
import { processManuelLocation } from "../lib/locationFunc";


const LocationService = (props) => {

    const { getPosition, street, setStreet, setCity, setCountry, city, country  } = props

    const { setLng, setLat } = useAuth();


    const handleLocation = async (e) => {
        e.preventDefault();
        const result = await processManuelLocation(city, country);
        setLng(result.lng);
        setLat(result.lan)
    }


    return (
        <div className="container w-50">
            <button onClick={getPosition} className="btn btn-primary mt-4 mb-4"><i className="fas fa-location-arrow me-1"></i>Current Location</button>
            <div className="text-primary mb-2">Or type desired location</div>
            <form onSubmit={handleLocation} className="border shadow p-2">
                <label htmlFor="street">Street: </label>
                <input
                type="text"
                name="street"
                value={street}
                onChange={e => setStreet(e.target.value)}
                />
                <label htmlFor="city">City: </label>
                <input 
                type="text"
                name="city"
                value={city}
                onChange={e => setCity(e.target.value)}
                />
                <label htmlFor="country">Country: </label>
                <input 
                type="text"
                name="country"
                value={country}
                onChange={e => setCountry(e.target.value)}
                />
                <div className="display-flex justify-content-center mt-2">
                    <button type="submit" className="btn btn-danger">Find me <i className="fas fa-toilet-paper ml-1"></i></button>
                </div>
            </form>
        </div>
    )

}

export default LocationService