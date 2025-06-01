import React, { useState } from 'react';
import FieldCanvas from './components/FieldCanvas';
import Controls from './components/Controls';
import PointInfo from './components/PointInfo';

function App() {
	// Начальные значения (примерные)
	const mu0 = 4 * Math.PI * 1e-7; // Магнитная постоянная
	const [h1, setH1] = useState(1); // метры
	const [h2, setH2] = useState(1); // метры
	const [mu1, setMu1] = useState(1 * mu0); // в вакууме
	const [mu2, setMu2] = useState(500 * mu0); // например, ферромагнетик
	const [I1, setI1] = useState(5); // Амперы, ток "на нас"
	const [I2, setI2] = useState(-5); // Амперы, ток "от нас" (отрицательное значение для обратного направления)

	const [selectedPointData, setSelectedPointData] = useState(null);

	const handlePointClick = (data) => {
		setSelectedPointData(data);
	};

	return (
		<div className="App">
			<header className="App-header">
				<p>
					Всем привет я App.jsx
				</p>
				<img
					src="https://avatars.mds.yandex.net/i?id=16492d525376ea328f1c34917b67f3f3_l-8000733-images-thumbs&n=13"/>
			</header>

	<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
		<h1>Визуализация магнитного поля</h1>
		<div style={{display: 'flex'}}>
			<Controls
				h1={h1} setH1={setH1}
				h2={h2} setH2={setH2}
				mu1={mu1} setMu1={setMu1}
					mu2={mu2} setMu2={setMu2}
					I1={I1} setI1={setI1}
					I2={I2} setI2={setI2}
				/>
				<FieldCanvas
					h1={h1} h2={h2}
					mu1={mu1} mu2={mu2}
					I1={I1} I2={I2}
					onPointClick={handlePointClick}
				/>
			</div>
			<PointInfo pointData={selectedPointData} />
		</div>
		</div>
	);
}

export default App;