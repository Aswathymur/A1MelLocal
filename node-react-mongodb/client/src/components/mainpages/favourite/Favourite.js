import React, { useContext} from 'react'
import { GlobalState } from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'
// import {Link} from 'react-router-dom'

function Favourite() {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [favourite, setFavourite] = state.userAPI.favourite

    const addToFavourite = async () =>{
        await axios.patch('/user/addfavourite', {favourite},{
            headers: {Authorization: token}
        })
    }

    const removeBusiness = id =>{
        if(window.confirm("Do tou want to remove this business?")){
            favourite.forEach((item, index) =>{
                if(item._id === id){
                    favourite.splice(index, 1)
                }
            })
            setFavourite([...favourite])
            addToFavourite()
        }
    }

    if (favourite.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Favourite Empty</h2>

    return (
        <div>
            {
                favourite.map(business => (
                    <div className="detail favourite" key={business._id}>
                        <img src={business.images.url} alt="" />

                        <div className="box-detail">
                            <h2>{business.title}</h2>

                            <h3>Address: {business.address}</h3>
                            <span>$ Rate: {business.price}</span>
                            <p>Description: {business.description}</p>
                            <p>Content: {business.content}</p>
                            <button><Link to={`/detail/${business._id}`}>More Information</Link></button>
                            <div className="delete" 
                            onClick={() =>removeBusiness(business._id)}>X</div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Favourite
