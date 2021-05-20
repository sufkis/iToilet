import { useEffect, useState } from 'react';
import sortByDistance from 'sort-by-distance';
import { useAuth } from '../contexts/Auth';
import ListItem from './listItem';

const ListView = (props) => {


    const { coords } = useAuth();

    const { toilets, setToilets}  = props

    const opts = {
        yName: 'lat',
        xName: 'lng'
    }


    useEffect(() => {
        let isMounted = true;
        if (isMounted && toilets.length > 0) {
            setToilets(sortByDistance(coords, toilets, opts))
            console.log(toilets)
        }
        return () => isMounted=false;
    }, [coords])

    return (
        <>
        <ul className="card-group">
            {toilets.map((toilet, index) => {
                return(
                    <ListItem key={toilet._id} toilet={toilet} />
                )
            })}
        </ul>
            
        </>
    )
}

export default ListView