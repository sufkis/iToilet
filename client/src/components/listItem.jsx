

const ListItem = ({toilet}) => {

    return (
        <>
            <div className="card" style={{width: "18rem"}}>
            <img className="card-img-top" src="..." alt="Card cap" />
            <div className="card-body">
                <h5 className="card-title">{toilet.text}</h5>
                <p className="card-text">{toilet.review} || Here is a review</p>
                <p className="card-text">determine location from user</p>
                <a href="#" className="btn btn-primary">Save me a seat</a>
            </div>
            </div>
        </>
    )
}

export default ListItem