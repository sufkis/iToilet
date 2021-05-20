import { useEffect, useState } from "react"
import { getToiletReview } from "../lib/api";


const ListItem = ({toilet}) => {

    const [review, setReview] = useState({});

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getToiletReview(toilet._id)
            .then(review => {
                console.log(review)
            })
        }
    },[])
    
    const handleSeat = (e) => {
        e.preventDefault();
        alert('Are you kidding? perhaps some day!')
    }

    return (
        <>
            <div className="card" style={{width: "18rem"}}>
            <div className="card-body  d-flex justify-content-center">
            <img className="card-img-top" src={toilet.file} style={{height: 155 ,width: 155, borderRadius: 20}}alt="Card cap" />
            <div className="m-1 row">
            <h5 className="card-title">{toilet.name}</h5>
                <p className="card-text">{toilet.review} || one day there will be a review</p>
                <p className="card-text">{toilet.text}</p>
                <p className="card-text">{toilet.price} &#8362;</p>
            </div>

            </div>
            <div className="d-flex flex-column justify-content-center align-items-center w-75">
            <button onClick={handleSeat} className="btn btn-info m-2">Save me a seat!</button>
            <a href="/review" className="btn btn-primary m-2">Add a review</a>
            </div>

            </div>
        </>
    )
}

export default ListItem