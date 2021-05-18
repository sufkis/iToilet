import { useEffect, useState } from 'react';
import sortByDistance from 'sort-by-distance';
import { useAuth } from '../contexts/Auth';
import ListItem from './listItem';

const ListView = ({ toilets }) => {

    const [currentToilets, setToilets] = useState([]);

    const { coords } = useAuth();

    const opts = {
        yName: 'lat',
        xName: 'lng'
    }

    console.log( coords )

    useEffect(() => {
        let isMounted = true;
        if (isMounted && toilets.length > 0) {
            setToilets(sortByDistance(coords, toilets, opts))
        }
        return () => isMounted=false;
    }, [coords])

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