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
        <div>
            <button onClick={getPosition} className="btn btn-primary">Current Location</button>
            <form onSubmit={handleLocation}>
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
                <div>
                    <button type="submit" className="btn btn-danger">Find me</button>
                </div>
            </form>
        </div>
    )

}

export default LocationService