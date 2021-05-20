import { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/Auth";
import { processManuelLocation } from "../lib/locationFunc";


const LocationService = (props) => {

    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(false);
  

    const { getPosition, handleOnPosition } = useAuth();
    const history = useHistory();

    const handleCurrent = async (e) => {
        e.preventDefault();
        getPosition();
        history.push('/map')
    }


    const handleLocation = async (e) => {
        e.preventDefault();
        setLoading(true)
        const result = await processManuelLocation(street, city, country);
        console.log(result.lat, result.lng)
        handleOnPosition(result.lat, result.lng)
        history.push('/map')
        setLoading(false);
    }


    return (
        <div className="container w-50">
            <button onClick={handleCurrent} className="btn btn-primary mt-4 mb-4"><i className="fas fa-location-arrow me-1"></i>Current Location</button>
            <div className="text-primary mb-4 d-flex justify-content-center">Or set manually</div>
            <form onSubmit={handleLocation} className="form-control border shadow p-3">
                <label htmlFor="street">Street: </label>
                <input
                className="form-control p-1"
                type="text"
                name="street"
                value={street}
                onChange={e => setStreet(e.target.value)}
                />
                <label htmlFor="city">City: </label>
                <input 
                className="form-control p-1"
                type="text"
                name="city"
                value={city}
                onChange={e => setCity(e.target.value)}
                />
                <label htmlFor="country">Country: </label>
                <input
                className="form-control p-1" 
                type="text"
                name="country"
                value={country}
                onChange={e => setCountry(e.target.value)}
                />
                <div className="d-flex justify-content-center mt-2">
                    {loading ? <button class="btn btn-danger" type="button" disabled>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Flushing
                                </button>
                      :  <button type="submit" className="btn btn-danger">Find me <i className="fas fa-toilet-paper ml-1"></i></button>}
                </div>
            </form>
        </div>
    )

}

export default LocationService