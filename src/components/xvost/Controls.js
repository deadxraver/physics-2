import React from 'react';
import '../../styles/xvost/controls.css'
const Controls = ({ h1, setH1, h2, setH2, mu1, setMu1, mu2, setMu2, I1, setI1, I2, setI2 }) => {
    return (

        <div className="main-container">
            <div className="slider">
                <label>h1:</label>
                <input type="range" min="0.1" max="7" step="0.1" value={h1} onChange={(e) => setH1(parseFloat(e.target.value))} />
                <span>{h1.toFixed(1)} м</span>
            </div>
            <div className="slider">
                <label>h2:</label>
                <input type="range" min="0.1" max="7" step="0.1" value={h2} onChange={(e) => setH2(parseFloat(e.target.value))} />
                <span>{h2.toFixed(1)} м</span>
            </div>
            <div className="slider">
                <label>μ1:</label>
                <input  type="range" min="1" max="1000" step="1" value={mu1 / (4 * Math.PI * 1e-7)} onChange={(e) => setMu1(parseFloat(e.target.value) * (4 * Math.PI * 1e-7))} />
                <span>{(mu1 / (4 * Math.PI * 1e-7)).toFixed(0)}</span>
            </div>
            <div className="slider">
                <label>μ2:</label>
                <input type="range" min="1" max="1000" step="1" value={mu2 / (4 * Math.PI * 1e-7)} onChange={(e) => setMu2(parseFloat(e.target.value) * (4 * Math.PI * 1e-7))} />
                <span>{(mu2 / (4 * Math.PI * 1e-7)).toFixed(0)}</span>
            </div>
            <div className="slider">
                <label>I1:</label>
                <input type="range" min="0" max="10" step="0.1" value={I1} onChange={(e) => setI1(parseFloat(e.target.value))} />
                <span>{I1.toFixed(1)} А</span>
            </div>
            <div className="slider">
                <label>I2:</label>
                <input type="range" min="0" max="10" step="0.1" value={I2} onChange={(e) => setI2(parseFloat(e.target.value))} />
                <span>{I2.toFixed(1)} А</span>
            </div>
        </div>
    );
};

export default Controls;