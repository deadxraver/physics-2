import React, {useState} from "react";
import '../../styles/introduction/main.css';
import {NavLink} from "react-router-dom";

function Main() {
	const [openSections, setOpenSections] = useState({
		gorb: false,
		xvost: false
	});

	const toggleSection = (section) => {
		setOpenSections(prev => ({
			...prev,
			[section]: !prev[section]
		}));
	};
	return (
		<>
			<h1>Всем привет с вами команда <b>= НЕЙРОТЕХ =</b> это наш проект по физике</h1>

			<div className="info-panel">
				{/* Горб */}
				<div className="section">
					<h2
						className="section-title"
						onClick={() => toggleSection('gorb')}
					>
						Визуализация колебаний заряженных частиц
						<span className="arrow">{openSections.gorb ? '▼' : '▶'}</span>
					</h2>

					{openSections.gorb && (
						<div className="section-content">
							<p>В проекте представлена система из двух зарядов, подвешенных на проволках равной длины.</p>
							<p>При переходе пользователем на страницу с проектом система приходит в действие</p>
							<p>Есть возможность нажать на ⏸️ и отрегулировать положение зарядов, а также запустить симуляцию заново 🔄 </p>
							<p>Проект визуализирует этот процесс</p>
							<NavLink
								to="/fluctuations"
								className={({ isActive }) =>
									isActive ? "custom-button active" : "custom-button"
								}
							>
								посмотреть
							</NavLink>
						</div>
					)}
				</div>

				{/* Хвост */}
				<div className="section">
					<h2
						className="section-title"
						onClick={() => toggleSection('xvost')}
					>
						Визуализация магнитного поля
						<span className="arrow">{openSections.xvost ? '▼' : '▶'}</span>
					</h2>

					{openSections.xvost && (
						<div className="section-content">
							<p>Есть система из двух бесконечно длинных прямых проводников с током.</p>
							<p>В одном из них ток направлен <b>НА</b> нас, во втором <b>ОТ</b> нас.</p>
							<p>Они находятся в средах с разной магнитной проницаемости, проводники находятся на
								расстояниях <b>h<sub>1</sub></b> и <b>h<sub>2</sub></b> от границы</p>
							<p>Нам нужно:</p>
							<ul>
								<li>Визуализировать векторы магнитной индукции, образуемые этими проводниками</li>
								<li>Создать возможность получать ее значение, кликая в рандомную точку</li>
							</ul>
							<NavLink
								to="/magnetic_induction"
								className={({ isActive }) =>
									isActive ? "custom-button active" : "custom-button"
								}
							>
								посмотреть
							</NavLink>
						</div>
					)}
				</div>
			</div>

			<h1>Поставьте много баллов пожалуйста</h1>
		</>
	);
}

export default Main
