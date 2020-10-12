import React, {createContext, useState, useEffect} from 'react'
import BusinessesAPI from './api/BusinessesAPI'
import CategoriesAPI from './api/CategoriesAPI'
import UserAPI from './api/UserAPI'

import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')
        
                setToken(res.data.accesstoken)
    
                setTimeout(() =>{
                    refreshToken()
                }, 10 * 60 * 1000)
            }
         refreshToken()
        }
    },[])

    const state = {
        token: [token, setToken],
        businessesAPI: BusinessesAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}