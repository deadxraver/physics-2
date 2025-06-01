import React from 'react';
import '../styles/xvost/nav-bar.css';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item">
                    <NavLink
                        to="/magnetic_induction"
                        className={({isActive}) =>
                            isActive ? "navbar__link active" : "navbar__link"
                        }
                    >
                        ПРОЕКТ: ХВОСТ
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink
                        to="/fluctuations"
                        className={({isActive}) =>
                            isActive ? "navbar__link active" : "navbar__link"
                        }
                    >
                        ПРОЕКТ: ГОРБЕНКО
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink
                        to="/contact"
                        className={({isActive}) =>
                            isActive ? "navbar__link active" : "navbar__link"
                        }
                    >
                        ЧЕ-ТО ЕЩЕ
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;