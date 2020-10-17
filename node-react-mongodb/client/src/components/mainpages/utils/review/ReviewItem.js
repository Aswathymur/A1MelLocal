import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

function ReviewItem({ review, deleteReview, }) {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const date = new Date(review.createdAt)

    return (
        <div className="review_card">
            <div className="review-card">
                <div className="review-header">
                <h3 writer={review.writer}>{review.user[0].firstName} {review.user[0].lastName}</h3>
                <span>Post on: {date.toDateString()} </span>
                </div>
                <div className="review-content">
                    <span>Rating: {review.rating} ★</span>
                    <p>{review.comment}</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewItem
