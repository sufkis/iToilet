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

    return (
        <>
            <div className="card" style={{width: "18rem"}}>
            <div className="card-body  d-flex">
            <img className="card-img-top" src={toilet.file} style={{height: 155 ,width: 155, borderRadius: 20}}alt="Card cap" />
            <div className="m-1 row">
            <h5 className="card-title">{toilet.name}</h5>
                <p className="card-text">{toilet.review} || Here is a review</p>
                <p className="card-text">determine location from user</p>
            </div>

            </div>
            <a href="/review" className="btn btn-primary">Add a review</a>
            </div>
        </>
    )
}

export default ListItem