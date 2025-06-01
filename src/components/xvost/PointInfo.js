import React from 'react';

const PointInfo = ({ pointData }) => {
    if (!pointData) {
        return <div style={{ width: '600px',height: '240px', padding: '20px', border: '1px solid #ccc'}}>
            <p>Кликните по полю, чтобы узнать значение магнитной индукции.</p>
        </div>;
    }

    return (
        <div style={{ width: '600px',height: '240px', padding: '20px', border: '1px solid #ccc' }}>
            <h3>Информация о точке:</h3>
            <p>Координаты (пикс): ({pointData.x.toFixed(0)}, {pointData.y.toFixed(0)})</p>
            <p>Магнитная индукция |B|: {pointData.B_magnitude.toExponential(2)} Тл</p>
            <p>Вектор B: ({pointData.B_x.toExponential(2)} Тл, {pointData.B_y.toExponential(2)} Тл)</p>
            <p>Использованная μ: {pointData.mu.toExponential(2)} Н/А²</p>
        </div>
    );
};

export default PointInfo;