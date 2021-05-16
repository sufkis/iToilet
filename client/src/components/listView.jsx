import sortByDistance from 'sort-by-distance';

const ListView = ({ toilets, userLocation }) => {



    const toiletsSorted = sortByDistance(userLocation, toilets)
    return (
        <>
        <ul className="list-group">
            {toiletsSorted.map((toilet, index) => {
                return(
                    <li className="list-group-item" key={index}>{toilet.text}</li>
                )
            })}
        </ul>
            
        </>
    )
}

export default ListView