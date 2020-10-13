import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [user, setUser] = useState({
        firstName:'', lastName:'', email:'', password:'', role:''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)
            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="register-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input type="text" name="firstName" required 
                placeholder="First Name" value={user.firstName} onChange={onChangeInput} />

                <input type="text" name="lastName" required 
                placeholder="Last Name" value={user.lastName} onChange={onChangeInput} />

                <input type="email" name="email" required 
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on" 
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <p>Business</p>
                <input type="checkbox" name="role"  value="1" onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Submit</button>
                    <Link to="/login">Already have account> </Link>
                </div>
            </form>
        </div>
    )
}

export default Register
