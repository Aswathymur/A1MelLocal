import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import Logo from './icon/Logo.png'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Favourite from './icon/favourite.svg'
import { Link } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [favourite] = state.userAPI.favourite

    const logoutUser = async () =>{
        await axios.get('/user/logout')

        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () => {
        return (
            <>
                <Link to="/create_business">Add Location</Link>
                <Link to="/category">Category</Link>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                <Link to='/' onClick={logoutUser}>Logout</Link>
            </>
        )
    }

    return (
        <header>
            <Navbar className='justify-content-end' activeKey='/'>
                <Navbar.Brand href='/'>{isAdmin ? <img src={Logo} alt='' width='80' /> : <img src={Logo} alt='' width='80' />}</Navbar.Brand>
                <Nav.Item>
                {
                  isLogged && <Link to='/map'>Map</Link> 
                }
                </Nav.Item>

                <Nav.Item>
                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <Link to='/login'>Login/ Register</Link>
                }
                </Nav.Item>
                <Nav.Item>
                {
                isAdmin ? ''
                    : <div className='favourite-icon'>
                        <span>{favourite.length}</span>
                        <Link to='/favourite'>
                            <img src={Favourite} alt='' width='30' />
                        </Link>
                    </div>
                }
                </Nav.Item>
            </Navbar>

        </header>
    )
}

export default Header
