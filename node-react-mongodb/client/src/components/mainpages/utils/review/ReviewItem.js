import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

function ReviewItem({ review, deleteReview, }) {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged

    const date = new Date(review.createdAt)

    return (
        <div className="review_card">
            
            {
                isLogged ?
                    <>
                        
                        <div className="review-card">
                            <div className="review-header">
                            <h3 style={{textTransform: "uppercase"}} writer={review.writer}>{review.writer}</h3>
                            <span>Post on: <span style={{fontSize: "12px"}}>{date.toDateString()}</span> </span>
                            </div>
                            <div className="review-content">
                                <span><b style={{fontSize: "20px"}}>Rating:</b> {review.rating} ★</span>
                                <p><b style={{fontSize: "20px"}}>Content:</b>{review.content}</p>
                                <Link style={{color: "white", backgroundColor: "#2c2c2c", padding: "15px 20px", display: "inline", marginLeft: "1080px"}} id="btn_love" to="#!"
                                    onClick={() => {
                                        if (window.confirm('Are you sure to delete this review?'))
                                            deleteReview(review._id)
                                    }}>
                                    Delete
                        </Link>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        
                        <div className="review-card">
                            <div className="review-header">
                            <h3 writer={review.writer}>{review.writer}</h3>
                            <span>Post on: {date.toDateString()} </span>
                            </div>
                            <div className="review-content">
                                <span>Rating: {review.rating} ★</span>
                                <p>{review.content}</p>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default ReviewItem