import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {GlobalState} from '../../../../GlobalState'
import './Review.css'

const initialState = {
    author: '',
    business: '',
    rating: 0,
    comment: ''
}

function Reviews({show, closeReview, business}) {
    const state = useContext(GlobalState)
    const [review, setReview] = useState(initialState)

    const [isLogged] = state.userAPI.isLogged

    const [user] = state.userAPI.user

    const [token] = state.token

    const history = useHistory()

    const [callback, setCallback] = state.reviewsAPI.callback

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setReview({...review, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if (!isLogged) return alert("You must login first")
            else{

                review.author   = user._id
                review.business = business._id

                await axios.post('/api/reviews', {...review},{
                    headers: {Authorization: token}
                })
            }
            alert("Thanks for your feedback!")
            setCallback(!callback)
            history.push('/')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="review"
            style={{
                transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
                opacity: show ? '1' : '0'
            }}
            >
            <form onSubmit={handleSubmit}>
                <div className="review-header">
                    <p>✍ REVIEW FORM ✍</p>
                    <span onClick={closeReview} className="close">X</span>
                </div>
                <div className="review-content">

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="comment" id="comment" required
                        value={review.comment} rows="7" onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="rating">Rating Point: </label>
                    <select name="rating" value={review.rating} onChange={handleChangeInput}>
                        <option value="1">1★</option>
                        <option value="2">2★</option>
                        <option value="3">3★</option>
                        <option value="4">4★</option>
                        <option value="5">5★</option>            
                    </select>
                </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Reviews
