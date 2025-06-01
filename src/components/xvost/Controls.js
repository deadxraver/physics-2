import React from 'react';

const Controls = ({ h1, setH1, h2, setH2, mu1, setMu1, mu2, setMu2, I1, setI1, I2, setI2 }) => {
    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
            <h3>Параметры:</h3>
            <div>
                <label>h1 (расстояние до диэлектрика, м):</label>
                <input type="range" min="0.1" max="5" step="0.1" value={h1} onChange={(e) => setH1(parseFloat(e.target.value))} />
                <span>{h1.toFixed(1)} м</span>
            </div>
            <div>
                <label>h2 (расстояние до диэлектрика, м):</label>
                <input type="range" min="0.1" max="5" step="0.1" value={h2} onChange={(e) => setH2(parseFloat(e.target.value))} />
                <span>{h2.toFixed(1)} м</span>
            </div>
            <div>
                <label>μ1 (магнитная проницаемость 1, Н/А² * 1e-7):</label>
                <input type="range" min="1" max="1000" step="1" value={mu1 / (4 * Math.PI * 1e-7)} onChange={(e) => setMu1(parseFloat(e.target.value) * (4 * Math.PI * 1e-7))} />
                <span>{(mu1 / (4 * Math.PI * 1e-7)).toFixed(0)}</span>
            </div>
            <div>
                <label>μ2 (магнитная проницаемость 2, Н/А² * 1e-7):</label>
                <input type="range" min="1" max="1000" step="1" value={mu2 / (4 * Math.PI * 1e-7)} onChange={(e) => setMu2(parseFloat(e.target.value) * (4 * Math.PI * 1e-7))} />
                <span>{(mu2 / (4 * Math.PI * 1e-7)).toFixed(0)}</span>
            </div>
            <div>
                <label>I1 (ток проводника 1, А):</label>
                <input type="range" min="-10" max="10" step="0.1" value={I1} onChange={(e) => setI1(parseFloat(e.target.value))} />
                <span>{I1.toFixed(1)} А</span>
            </div>
            <div>
                <label>I2 (ток проводника 2, А):</label>
                <input type="range" min="-10" max="10" step="0.1" value={I2} onChange={(e) => setI2(parseFloat(e.target.value))} />
                <span>{I2.toFixed(1)} А</span>
            </div>
        </div>
    );
};

export default Controls;