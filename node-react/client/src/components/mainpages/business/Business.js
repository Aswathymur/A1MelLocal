import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import BusinessItem from '../utils/businessItem/BusinessItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import LoadMore from './LoadMore'


function Business() {
    const state = useContext(GlobalState)
    const [businesses, setBusinesses] = state.businessesAPI.businesses
    const [isAdmin] = state.userAPI.isAdmin
    const [isLogged] = state.userAPI.isLogged
    const [token] = state.token
    const [callback, setCallback]= state.businessesAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
       businesses.forEach(business => {
           if(business._id === id) business.checked = !business.checked
       })
       setBusinesses([...businesses])
    }

    const deleteBusiness = async(id, public_id) =>{
        console.log({id, public_id})
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteBusiness = axios.delete(`/api/businesses/${id}`,{
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteBusiness
            setCallback(!callback)
            setLoading(false)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        businesses.forEach(business =>{
            business.checked = !isCheck
        })
        setBusinesses([...businesses])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        businesses.forEach(business =>{
            if(business.checked) deleteBusiness(business._id, business.images.public_id, business.menu.public_id)
        })
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
        {
            isAdmin &&
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete All</button>
            </div>
        }
        {
            isLogged &&
            <div className="businesses">
                {
                    businesses.map(business =>{
                        return <BusinessItem key={business._id} business={business}
                        isAdmin={isAdmin} deleteBusiness={deleteBusiness} handleCheck={handleCheck}/>
                    })
                }
            </div>
        }

        <LoadMore />
        {businesses.length === 0 && <Loading />}
        </>
    )
}

export default Business
