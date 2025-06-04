import React from 'react';
import "../../styles/xvost/point-info.css"
const PointInfo = ({ pointData }) => {
    if (!pointData) {
        return <div className="click-info">
            <p>кликните по полю, чтобы узнать значение магнитной индукции в точке. 😊</p>
        </div>;
    }

    return (
        <div className="click-info">
            <h3 style={{color: '#6A11CBFF'}}>ИНФОРМАЦИЯ О KЛИКЕ:</h3>

            <div className="info-row">
                <span className="info-label">|B|:</span>
                <span className="info-value">{pointData.B_magnitude.toExponential(2)} Тл</span>
            </div>
            <div className="info-row">
                <span className="info-label">вектор B:</span>
                <span
                    className="info-value">({pointData.B_x.toExponential(2)} Тл, {pointData.B_y.toExponential(2)} Тл)</span>
            </div>
            <div className="info-row">
                <span className="info-label">использованная μ:</span>
                <span className="info-value">{pointData.mu.toExponential(2)} Н/А²</span>
            </div>
        </div>
    );
};

export default PointInfo;