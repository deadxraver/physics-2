import Controls from "./Controls";
import FieldCanvas from "./FieldCanvas";
import PointInfo from "./PointInfo";
import {useState} from "react";

export default function MagneticInduction() {
    // Начальные значения (примерные)
    const mu0 = 4 * Math.PI * 1e-7; // Магнитная постоянная
    const [h1, setH1] = useState(4); // метры
    const [h2, setH2] = useState(4); // метры
    const [mu1, setMu1] = useState(mu0); // в вакууме
    const [mu2, setMu2] = useState(500 * mu0); // например, ферромагнетик
    const [I1, setI1] = useState(5); // Амперы, ток "на нас"
    const [I2, setI2] = useState(5); // Амперы, ток "от нас" (отрицательное значение для обратного направления)

    const [selectedPointData, setSelectedPointData] = useState(null);

    const handlePointClick = (data) => {
        setSelectedPointData(data);
    };

    return (<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2>----------------------------</h2>
        <h1>Визуализация магнитного поля</h1>
        <div style={{display: 'flex', padding:'10px'}}>
            <div>
            <Controls
                h1={h1} setH1={setH1}
                h2={h2} setH2={setH2}
                mu1={mu1} setMu1={setMu1}
                mu2={mu2} setMu2={setMu2}
                I1={I1} setI1={setI1}
                I2={I2} setI2={setI2}
            />
            <PointInfo pointData={selectedPointData}></PointInfo>
            </div>
            <FieldCanvas
                h1={h1} h2={h2}
                mu1={mu1} mu2={mu2}
                I1={I1} I2={I2}
                onPointClick={handlePointClick}
            />
        </div>
    </div>);
}