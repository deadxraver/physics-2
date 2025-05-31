import React from 'react';
import './nav-bar.css';
//TODO маппинги поменять))
const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item">
                    <a href="/" className="navbar__link">ПРОЕКТ: ХВОСТ</a>
                </li>
                <li className="navbar__item">
                    <a href="/about" className="navbar__link">ПРОЕКТ: ГОРБЕНКО</a>
                </li>
                <li className="navbar__item">
                    <a href="/contact" className="navbar__link">ЧЕ-ТО ЕЩЕ</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;