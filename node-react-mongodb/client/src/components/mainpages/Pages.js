import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Businesses from './businesses/Businesses'
import MyBusinesses from './myBusinesses/MyBusinesses'
import DetailBusiness from './detailBusiness/DetailBusiness'
import Login from './auth/Login'
import Register from './auth/Register'
import Favourite from './favourite/Favourite'
import Categories from './categories/Categories'
import CreateBusiness from './createBusiness/CreateBusiness'
import Map from './map/Map'
import NotFound from './utils/not_found/NotFound'

import {GlobalState} from '../../GlobalState'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <div>
            <Switch>
                <Route path="/" exact component={Map} />
                <Route path="/detail/:id" exact component={DetailBusiness} />
                <Route path="/login" exact component={isLogged ? NotFound : Login} />
                <Route path="/register" exact component={isLogged ? NotFound : Register} />
                <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
                <Route path="/create_business" exact component={isAdmin ? CreateBusiness : NotFound} />
                <Route path="/edit_business/:id" exact component={isAdmin ? CreateBusiness : NotFound} />
                <Route path="/favourite" exact component={Favourite} />
                <Route path="/businesses" exact component={Businesses} />
                <Route path="/my_businesses" exact component={MyBusinesses} />
                <Route path="*" exact component={NotFound} />
            </Switch>
        </div>
    )
}

export default Pages
