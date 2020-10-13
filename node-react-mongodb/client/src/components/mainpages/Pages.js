import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Businesses from './businesses/Businesses'
import DetailBusiness from './detailBusiness/DetailBusiness'
import Login from './auth/Login'
import Register from './auth/Register'
import Favourite from './favourite/Favourite'
import Categories from './categories/Categories'
import CreateBusiness from './createBusiness/CreateBusiness'
import Map from './map/Map'
import MVF1 from './userGuide/MVF1'
import MVF2 from './userGuide/MVF2'
import MVF3 from './userGuide/MVF3'
import MVF4 from './userGuide/MVF4'
import MVF5 from './userGuide/MVF5'
import EVF from './userGuide/EVF'
import NotFound from './utils/not_found/NotFound'

import {GlobalState} from '../../GlobalState'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <div>
            <Switch>
                <Route path="/" exact component={Businesses} />
                <Route path="/detail/:id" exact component={DetailBusiness} />

                <Route path="/login" exact component={isLogged ? NotFound : Login} />
                <Route path="/register" exact component={isLogged ? NotFound : Register} />

                <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
                <Route path="/create_business" exact component={isAdmin ? CreateBusiness : NotFound} />
                <Route path="/edit_business/:id" exact component={isAdmin ? CreateBusiness : NotFound} />

                <Route path="/favourite" exact component={Favourite} />
                <Route path="/map" exact component={Map} />

                <Route path="/mvf1" exact component={MVF1} />
                <Route path="/mvf2" exact component={MVF2} />
                <Route path="/mvf3" exact component={MVF3} />
                <Route path="/mvf4" exact component={MVF4} />
                <Route path="/mvf5" exact component={MVF5} />
                <Route path="/evf" exact component={EVF} />
                


                <Route path="*" exact component={NotFound} />
            </Switch>
        </div>
    )
}

export default Pages
