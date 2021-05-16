import { useEffect, useState } from 'react';
import sortByDistance from 'sort-by-distance';

const ListView = ({ toilets, userLocation }) => {

    const [currentToilets, setToilets] = useState([]);

    const opts = {
        yName: 'lat',
        xName: 'lng'
    }

    useEffect(() => {
        let isMounted = true;
        if (isMounted && toilets.length > 0) {
            setToilets(sortByDistance(userLocation, toilets, opts))
        }
        return () => isMounted=false;
    }, [])

    return (
        <>
        <ul className="list-group">
            {currentToilets.map((toilet, index) => {
                return(
                    <li className="list-group-item" key={index}>{toilet.text}</li>
                )
            })}
        </ul>
            
        </>
    )
}

export default ListView