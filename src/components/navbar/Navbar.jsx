

import "./Navbar.scss";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo-Wica.jpg"
import CartWidget from "../cartWidget/CartWidget";


const Navbar = () => {


    return (
        <header>
            <nav>
                <Link to="/">
                    <img src={logo} alt="" className="brand-logo"/>
                </Link>
                <ul className="nav-menu">
                    <li>
                        <Link to="/nosotros">Nosotros</Link>
                    </li>
                    <li>
                        <Link to="/categoria/medallones">Medallones</Link>
                    </li>
                    <li>
                        <Link to="/categoria/nuggets">Nuggets</Link>
                    </li>
                    <li>
                        <Link to="/donde-comprar">Donde Comprar</Link>
                    </li>
                    <li>
                        <Link to="/contacto">Contacto</Link>
                    </li>
                </ul>
                <Link to="/cart"><CartWidget /></Link>
                <div className="hamburger">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </header>
        
    )
}
export default Navbar;



