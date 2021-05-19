import { useState } from "react"
import { useHistory } from "react-router";
import { createNewReview } from "../lib/api";

const Review = () => {

    const [text, setText] = useState('');
    const [rate, setRate] = useState(0);
    const [success, setSuccess] = useState(false);

    const history = useHistory();


    const handleReview = async (e) => {
        e.reviewDefault();
        const review = {
            rate,
            text
        }
        try {
            const data = await createNewReview(review);
            if (data.status === 200) setSuccess(true);
            else console.log(data);
            history.push('/main');

        } catch(err) {
            console.error(err);
        }
        
    }

    const handleSelect = (value) => {
        setRate(value);
    }


    return (
        <div className="container w-50">
        <form onSubmit={handleReview} className="form-group">
            <label htmlFor="rate">Rate the seat</label>
            <select onChange={e=> handleSelect(e.target.value)} className="form-control">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <label htmlFor="text">How was you expreince? </label>
            <input
                type="text" 
                value={text} 
                onChange={e=> setText(e.target.value)} 
                className="form-control"
             />
             <div className="d-flex justify-content-center m-2">
             <button type="submit" className="btn btn-primary">Submit</button>
             </div>
            {success && <div className="text-success">Review added successfully!</div>}
        </form>
        </div>
    )
}

export default Review