import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [favourite, setFavourite] = useState([])
    const [user, setUser] = useState([])

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor',{
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setFavourite(res.data.favourite)

                    setUser(res.data)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
        }
    },[token])
    
    const addFavourite = async (business) => {
        if(!isLogged) return alert("Please login first")

        const check = favourite.every(item =>{
            return item._id !== business._id
        })

        if(check){
            setFavourite([...favourite, {...business, quantity: 1}])

            await axios.patch('/user/addfavourite', {favourite: [...favourite, {...business, quantity: 1}]},{
                headers: {Authorization: token}
            })

        } else{
            alert("Business is added to favourite")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        favourite: [favourite, setFavourite],
	user: [user, setUser],
        addFavourite: addFavourite
    }
}

export default UserAPI
