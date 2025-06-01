import React, { useRef, useEffect } from 'react';

const FieldCanvas = ({ h1, h2, mu1, mu2, I1, I2, onPointClick }) => {
    const canvasRef = useRef(null);
    const scale = 50; // Например, 50 пикселей на 1 метр

    // Определяем положение диэлектрика по Y
    const dielectricY = 375; // Допустим, на 300 пикселей сверху от начала канваса

    // Положения проводников (в пикселях относительно канваса)
    // Эти значения будут зависеть от h1, h2 и масштаба
    // Пусть проводник 1 находится над диэлектриком, проводник 2 под
    const conductor1X = 500;
    const conductor1Y = dielectricY - h1 * scale;

    const conductor2X = 500;
    const conductor2Y = dielectricY + h2 * scale;


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const drawField = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем канвас

            // Рисуем диэлектрик
            ctx.strokeStyle = '#0080ff'; // Цвет диэлектрика
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(0, dielectricY);
            ctx.lineTo(canvas.width, dielectricY);
            ctx.stroke();
            ctx.font = 'bold 14px Verdana'; // Установка шрифта
            ctx.fillStyle = '#6A11CBFF'; // Цвет текста
            ctx.fillText(`μ1`, 10, dielectricY - 10);
            ctx.fillText(`μ2`, 10, dielectricY + 20);

            // --- Рисуем проводник 1 (кружок с крестиком для тока "на нас") ---
            ctx.strokeStyle = '#ff0000'; // Цвет обводки
            ctx.lineWidth = 1.5; // Толщина линии
            ctx.beginPath();
            ctx.arc(conductor1X, conductor1Y, 8, 0, Math.PI * 2); // Кружок
            ctx.stroke();
            // Крестик
            ctx.fillStyle = '#ff0000'; // Цвет точки
            ctx.beginPath();
            ctx.arc(conductor1X, conductor1Y, 3, 0, Math.PI * 2); // Точка
            ctx.fill();
            ctx.fillStyle = '#6A11CBFF'; // Цвет текста
            ctx.fillText(`I1: ${I1}A (на нас)`, conductor1X + 15, conductor1Y - 5);

            // --- Рисуем проводник 2 (кружок с точкой для тока "от нас") ---
            ctx.strokeStyle = '#ff0000'; // Цвет обводки
            ctx.lineWidth = 1.5; // Толщина линии
            ctx.beginPath();
            ctx.arc(conductor2X, conductor2Y, 8, 0, Math.PI * 2); // Кружок
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(conductor2X - 5, conductor2Y - 5);
            ctx.lineTo(conductor2X + 5, conductor2Y + 5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(conductor2X + 5, conductor2Y - 5);
            ctx.lineTo(conductor2X - 5, conductor2Y + 5);
            ctx.stroke();

            ctx.fillStyle = '#6A11CBFF'; // Цвет текста
            ctx.fillText(`I2: ${I2}A (от нас)`, conductor2X + 15, conductor2Y - 5);


            // Рисуем векторы поля
            const gridSize = 40; // Размер сетки для векторов
            ctx.strokeStyle = '#9a8faa'; // Цвет векторов
            ctx.lineWidth = 1;

            for (let x = gridSize / 2; x < canvas.width; x += gridSize) {
                for (let y = gridSize / 2; y < canvas.height; y += gridSize) {
                    // Переводим пиксельные координаты в "физические" (относительно проводников)
                    // Важно: mu должна зависеть от y-координаты точки, а не от проводника
                    const currentMu = y < dielectricY ? mu1 : mu2;

                    // Вычисляем B от проводника 1
                    let B1x = 0;
                    let B1y = 0;
                    const r1 = Math.sqrt((x - conductor1X) ** 2 + (y - conductor1Y) ** 2) / scale;
                    if (r1 > 0.01) { // Избегаем деления на ноль для точек, близких к проводнику
                        const B_magnitude1 = (currentMu * I1) / (2 * Math.PI * r1);
                        // Направление: перпендикулярно радиусу. Для тока "на нас" (из экрана): (+y, -x)
                        // Обратите внимание: в физике "на нас" обычно точка, "от нас" - крестик.
                        // Здесь реализовано по вашему запросу: I1 (на нас) -> крестик, I2 (от нас) -> точка.
                        // Если I1 "на нас" (из экрана), то вектор B вращается по часовой стрелке вокруг проводника.
                        // Компоненты: Bx = B * sin(angle_to_conductor), By = -B * cos(angle_to_conductor)
                        // где angle_to_conductor - угол от горизонтали до радиус-вектора от проводника к точке
                        // (x - conductor1X) и (y - conductor1Y) - это дельты dx, dy
                        B1x = B_magnitude1 * (y - conductor1Y) / (r1 * scale);
                        B1y = -B_magnitude1 * (x - conductor1X) / (r1 * scale);
                    }

                    // Вычисляем B от проводника 2
                    let B2x = 0;
                    let B2y = 0;
                    const r2 = Math.sqrt((x - conductor2X) ** 2 + (y - conductor2Y) ** 2) / scale;
                    if (r2 > 0.01) {
                        const B_magnitude2 = (currentMu * I2) / (2 * Math.PI * r2);
                        // Для тока "от нас" (в экран), вектор B вращается против часовой стрелки вокруг проводника.
                        // Компоненты: Bx = -B * sin(angle_to_conductor), By = B * cos(angle_to_conductor)
                        B2x = -B_magnitude2 * (y - conductor2Y) / (r2 * scale);
                        B2y = B_magnitude2 * (x - conductor2X) / (r2 * scale);
                    }

                    // Суммируем векторы
                    const B_totalX = B1x + B2x;
                    const B_totalY = B1y + B2y;
                    const B_total_magnitude = Math.sqrt(B_totalX ** 2 + B_totalY ** 2);

                    // Рисуем стрелочку
                    const arrowLength = Math.min(gridSize / 2, B_total_magnitude * 1e5); // Масштабируем для визуализации
                    const angle = Math.atan2(B_totalY, B_totalX);

                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(angle);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(arrowLength, 0);
                    ctx.stroke();
                    // Нарисовать наконечник стрелки
                    ctx.beginPath();
                    ctx.moveTo(arrowLength, 0);
                    ctx.lineTo(arrowLength - 5, -3);
                    ctx.moveTo(arrowLength, 0);
                    ctx.lineTo(arrowLength - 5, 3);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        };

        drawField();
    }, [h1, h2, mu1, mu2, I1, I2, dielectricY, conductor1X, conductor1Y, conductor2X, conductor2Y]); // Перерисовываем при изменении параметров

    const handleClick = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Вычисляем поле в точке mouseX, mouseY
        const mu = mouseY < dielectricY ? mu1 : mu2; // Проницаемость среды в точке клика

        const r1 = Math.sqrt((mouseX - conductor1X) ** 2 + (mouseY - conductor1Y) ** 2) / scale;
        let B1x = 0, B1y = 0;
        if (r1 > 0.01) {
            const B_magnitude1 = (mu * I1) / (2 * Math.PI * r1);
            B1x = B_magnitude1 * (mouseY - conductor1Y) / (r1 * scale);
            B1y = -B_magnitude1 * (mouseX - conductor1X) / (r1 * scale);
        }

        const r2 = Math.sqrt((mouseX - conductor2X) ** 2 + (mouseY - conductor2Y) ** 2) / scale;
        let B2x = 0, B2y = 0;
        if (r2 > 0.01) {
            const B_magnitude2 = (mu * I2) / (2 * Math.PI * r2);
            B2x = -B_magnitude2 * (mouseY - conductor2Y) / (r2 * scale);
            B2y = B_magnitude2 * (mouseX - conductor2X) / (r2 * scale);
        }

        const B_totalX = B1x + B2x;
        const B_totalY = B1y + B2y;
        const B_total_magnitude = Math.sqrt(B_totalX ** 2 + B_totalY ** 2);

        onPointClick({
            x: mouseX,
            y: mouseY,
            B_magnitude: B_total_magnitude,
            B_x: B_totalX,
            B_y: B_totalY,
            mu: mu, // Какую проницаемость использовали для расчёта
        });
    };

    return (
        <canvas
            ref={canvasRef}
            width={1000}
            height={750}
            style={{ border: '1px solid black' }} // Бордер оставил черным для видимости канваса
            onClick={handleClick}
        />
    );
};

export default FieldCanvas;