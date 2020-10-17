import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import BusinessItem from '../utils/businessItem/BusinessItem'
import Reviews from '../utils/review/Reviews'
import ReviewList from '../utils/review/ReviewList'

function DetailBusiness() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [businesses] = state.businessesAPI.businesses
    const addFavourite = state.userAPI.addFavourite
    const [detailBusiness, setDetailBusiness] = useState([])

    const [show, setShow] = useState(false)
    const closeReview = () => setShow(false)

    useEffect(() => {
        if (params.id) {
            businesses.forEach(business => {
                if (business._id === params.id) setDetailBusiness(business)
            })
        }
    }, [params.id, businesses])

    if (detailBusiness.length === 0) return null;

    return (
        <>

            <div className="detail">
                <img src={detailBusiness.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailBusiness.title}</h2>
                        <h6>#id: {detailBusiness.business_id}</h6>
                    </div>
                    <span>Rate: ${detailBusiness.price}</span>
                    <p>Address: {detailBusiness.address}</p>
                    <p>Description: {detailBusiness.description}</p>
                    <p>Content: {detailBusiness.comment}</p>
                    <Link to="/favourite" className="favourite" 
                    onClick={() => addFavourite(detailBusiness)}>Add to Favourite</Link>
        
                    <button onClick={() => setShow(true)} style={{background: "#2c2c2c", fontSize: "15px", margin: ".5rem", padding:"10px 25px", display:"inline-block"}}>Review</button>

                </div>
                <Reviews show={show} closeReview={closeReview} business={detailBusiness} />
                <h2 className="menu-title">~Menu~</h2>
                <img id="menu" src={detailBusiness.menu.url} alt="" />
            </div>
            <div>
                <ReviewList business={detailBusiness} />
            </div>

            <div>
                <h2>Related businesses</h2>
                <div className="businesses">
                    {
                        businesses.map(business =>{
                            return business.category === detailBusiness.category
                                ? <BusinessItem key={business._id} business={business} /> :null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailBusiness
