import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import Logo from './icon/Logo.png'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Favourite from './icon/favourite.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [favourite] = state.userAPI.favourite

    const logoutUser = async () => {
        await axios.get('/user/logout')

        localStorage.removeItem('firstLogin')

        window.location.href = "/";
    }

    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_business">Create Business</Link></li>
                <li><Link to="/category">Category</Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

    return (
        <header>
            <div className="menu">
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">
                        {isAdmin ? 'Admin' : <img src={Logo} alt="" width="80" />}
                    </Link>
                </h1>
            </div>

            <ul>
                <li><Link to="/MVF1">User Guide</Link></li>
                <li><Link to="/map">Map</Link></li>
                <li><Link to="/">{isAdmin ? 'Admin' : 'Business'}</Link></li>
                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login/ Register</Link></li>
                }

                <li>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>
            </ul>

            {
                isAdmin ? ''
                    : <div className="favourite-icon">
                        <span>{favourite.length}</span>
                        <Link to="/favourite">
                            <img src={Favourite} alt="" width="30" />
                        </Link>
                    </div>
            }

        </header>
    )
}

export default Header
