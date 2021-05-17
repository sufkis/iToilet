import { processManuelLocation } from "../lib/locationFunc";


const LocationService = (props) => {

    const { getPosition, setCity, setCountry, city, country , setCoords } = props


    const handleLocation = async (e) => {
        e.preventDefault();
        const result = await processManuelLocation(city, country);
        setCoords(result.lan, result.lng)
    }

    console.log(getPosition)

    return (
        <div>
            <button onClick={getPosition} className="btn btn-primary">Current Location</button>
            <form onSubmit={handleLocation}>
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