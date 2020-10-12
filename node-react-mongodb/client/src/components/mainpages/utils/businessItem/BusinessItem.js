import React from 'react'
import BtnRender from './BtnRender'

function BusinessItem({ business, isAdmin, deleteBusiness, handleCheck}) {
    
    return (
        <div className="business_card">
            {
                isAdmin && <input type="checkbox" checked={business.checked} 
                onChange={() => handleCheck(business._id)}/>
            }
            <img src={business.images.url} alt="" />

            <div className="business_box">
                <h2 title={business.title}>{business.title}</h2>
                <span>$ Price Rate $: {business.price} </span>
                <p>{business.description}</p>
            </div>


            <BtnRender business={business} deleteBusiness={deleteBusiness} />
        </div>
    )
}

export default BusinessItem
