import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

function BtnRender({ business, deleteBusiness }) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addFavourite = state.userAPI.addFavourite

    return (
        <div className="row_btn">
            {
                isAdmin ?
                    <>
                        <Link id="btn_love" to="#!" 
                        onClick={() => deleteBusiness(business._id, business.images.public_id)}>
                            Delete
                        </Link>
                        <Link id="btn_view" to={`/edit_business/${business._id}`}>
                            Edit
                        </Link>
                    </>
                    : <>
                        <Link id="btn_love" to="#!" onClick={() => addFavourite(business)}>
                            Love
                        </Link>
                        <Link id="btn_view" to={`/detail/${business._id}`}>
                            View
                        </Link>
                    </>
            }
        </div>
    )
}

export default BtnRender
