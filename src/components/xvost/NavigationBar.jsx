import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <nav style={{
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            marginBottom: '2rem'
        }}>
            <ul style={{
                listStyle: 'none',
                display: 'flex',
                gap: '2rem',
                margin: 0,
                padding: 0
            }}>
                <li>
                    <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
                        Главная
                    </Link>
                </li>
                <li>
                    <Link to="/fluctuations" style={{ textDecoration: 'none', color: '#333' }}>
                        Электромагнитные колебания
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar; 