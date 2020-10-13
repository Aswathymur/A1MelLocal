import React from 'react'
import { Link } from 'react-router-dom'

function MVF2() {
    return (
        <div>
            <div className="nav-bar">
            <ul>
                <li><Link to="/EVF">EVF</Link></li>
                <li><Link to="/MVF1">MVF1</Link></li>
                <li><Link to="/MVF3">MVF3</Link></li>
                <li><Link to="/MVF4">MVF4</Link></li>
                <li><Link to="/MVF5">MVF5</Link></li>
            </ul>   
            </div>
            <h1 className="header">MVF2: Creation Business</h1>
        </div>
    )
}

export default MVF2