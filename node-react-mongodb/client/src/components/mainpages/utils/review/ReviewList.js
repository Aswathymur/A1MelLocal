import React, { useContext} from 'react'
import { GlobalState } from '../../../../GlobalState'
import ReviewItem from '../review/ReviewItem'
import axios from 'axios'

function ReviewList() {
    const state = useContext(GlobalState)
    const [reviews] = state.reviewsAPI.reviews
    const [callback, setCallback]= state.reviewsAPI.callback
    const [isLogged] = state.userAPI.isLogged
    const [token] = state.token

    const deleteReview = async(id) =>{
        console.log({id})
        try {
            const deleteReview = axios.delete(`/api/reviews/${id}`,{
                headers: {Authorization: token}
            })
            await deleteReview
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <>
        <h2 style={{color: "blue", padding: "30px 20px", fontSize: "30px"}}>Reviews from Customers</h2>
        <div>
           {
               reviews.map(review=>
                {
                   return <ReviewItem key={review._id} review={review} deleteReview={deleteReview}
                                        isLogged={isLogged}/>
               })
           }
        </div>
        </>
    )
}

export default ReviewList
