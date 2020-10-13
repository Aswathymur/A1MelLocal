import {useState, useEffect} from 'react'
import axios from 'axios'

function ReviewsAPI() {
        const [reviews, setReviews] = useState([])
        const [callback, setCallback] = useState(false)
        

        useEffect(() =>{
            const getReviews = async () => {
                const res = await axios.get('/api/reviews')
                setReviews(res.data)
                
            }
            getReviews()
        },[callback])

    return {
        reviews: [reviews, setReviews],
        callback: [callback, setCallback],
        
    }
}

export default ReviewsAPI
