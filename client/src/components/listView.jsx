import { useEffect, useState } from 'react';
import sortByDistance from 'sort-by-distance';
import ListItem from './listItem';

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
        <ul className="card-group">
            {currentToilets.map((toilet, index) => {
                return(
                    <ListItem key={toilet.id} toilet={toilet} />
                )
            })}
        </ul>
            
        </>
    )
}

export default ListView