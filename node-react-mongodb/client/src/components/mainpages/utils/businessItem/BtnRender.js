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
                        <Link id="btn_view" to={`/detail/${business._id}`}>
                            View
                        </Link>
                    </>
                    : <>
                        <Link id="btn_love" to="#!" onClick={() => addFavourite(business)}>
                            Favourite
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
