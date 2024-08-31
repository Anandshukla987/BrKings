import * as React from 'react';
import { NavLink } from 'react-router-dom'


const NavTabs = () => {


    return (
        <>
            <nav className="">
                <div className="navLink text-2xl">

                    <div className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/brownies">Brownies</NavLink>
                    </div>

                    <div className="nav-item">
                        <NavLink className="nav-link" to="/getinTouch">Get in Touch</NavLink>
                    </div>

                    <div className="nav-item">
                        <NavLink className="nav-link" to="/contact">about Us</NavLink>
                    </div>

                    <div className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/yourOrder">My Orders</NavLink>
                    </div>
                    
                </div>
            </nav>
        </>
    )
}

export default NavTabs