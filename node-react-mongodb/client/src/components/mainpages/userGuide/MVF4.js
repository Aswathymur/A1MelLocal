import React from 'react'
import { Link } from 'react-router-dom'

function MVF4() {
    return (
        <div>
            <div className="nav-bar">
            <ul>
                <li><Link to="/EVF">EVF</Link></li>
                <li><Link to="/MVF1">MVF1</Link></li>
                <li><Link to="/MVF2">MVF2</Link></li>
                <li><Link to="/MVF3">MVF3</Link></li>
                <li><Link to="/MVF5">MVF5</Link></li>
            </ul>  
            </div>
            <h1 className="header">MVF4: Filter business system</h1>
        </div>
    )
}

export default MVF4