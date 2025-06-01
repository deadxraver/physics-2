import React, {useState} from "react";

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
			<h1>-----------------------------------------------------------------------</h1>
			<h1>Всем привет с вами команда <b>= НЕЙРОТЕХ =</b> это наш проект по физике</h1>
			<div>На этой странице представлена информация о двух визуализациях</div>
			<div className="info-panel">
				{/* Горб */}
				<div className="section">
					<h2
						className="section-title"
						onClick={() => toggleSection('gorb')}
					>
						Горбенко
						<span className="arrow">{openSections.gorb ? '▼' : '▶'}</span>
					</h2>

					{openSections.gorb && (
						<div className="section-content">
							<p>Здесь представлен равнобедренный треугольник, в котором все симметрично относительно
								медианы проведенной к основанию.</p>
							<p>На концах заряженные частицы (их заряды так же симметричны), соединены проволоками</p>
							<p>По сигналу пользователя проволока в основании рвется, и система начинает колебаться</p>
							<p>Проект визуализирует этот процесс</p>
						</div>
					)}
				</div>

				{/* Хвост */}
				<div className="section">
					<h2
						className="section-title"
						onClick={() => toggleSection('xvost')}
					>
						Хвост
						<span className="arrow">{openSections.xvost ? '▼' : '▶'}</span>
					</h2>

					{openSections.xvost && (
						<div className="section-content">
							<p>есть система из двух бесконечно длинных проводников.</p>
							<p>Один из них направлен НА нас, второй ОТ нас.</p>
							<p>Они разделены горизонтально расположенным диэлектриком, проводники находятся на
								расстояниях h1 и h2 от него соотвественно</p>
							<p>По разные стороны от диэлектрика разная магнитная проницаемость среды.</p>
							<p>нам нужно:</p>
							<ul>
								<li>визуализировать векторы магнитной индукции, образуемые этими проводниками</li>
								<li>создать возможность получать ее значение, тапая в рандомную точку</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Main
