import React from 'react'
import './footer.css'

function Footer() {

    return (
        <footer>
            <div className="container">
                <div className="left_footer">
                    <h1 className="heading">
                        MELLOCAL
                    </h1>
                    <p className="copyright">
                        &copy; 2020
                    </p>
                </div>
                <div className="right_footer">
                    <p>Proprietary images used for Educational purposes only</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
