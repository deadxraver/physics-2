import React from 'react';
import '../styles/xvost/nav-bar.css';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item">
                    <NavLink
                        to={"https://miro.com/app/board/uXjVItoNecU=/?share_link_id=863180669537"}
                        className={({isActive}) =>
                            isActive ? "navbar__link active" : "navbar__link"
                        }
                    >
                        РАСЧЕТЫ
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink
                        to="/"
                        className={({isActive}) =>
                            isActive ? "navbar__link active" : "navbar__link"
                        }
                    >
                        НА ГЛАВНУЮ
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink
                        to="/magnetic_induction"
                        className={({isActive}) =>
                            isActive ? "navbar__link active" : "navbar__link"
                        }
                    >
                        ПРОЕКТ: ПОЛЯ
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink
                        to="/fluctuations"
                        className={({isActive}) =>
                            isActive ? "navbar__link active" : "navbar__link"
                        }
                    >
                        ПРОЕКТ: ТРЕУГОЛЬНИК
                    </NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink
                        to="/contact"
                        className={({isActive}) =>
                            isActive ? "navbar__link active" : "navbar__link"
                        }
                    >
                        О НАС
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;