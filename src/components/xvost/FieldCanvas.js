import React, { useRef, useEffect } from 'react';

const FieldCanvas = ({ h1, h2, mu1, mu2, I1, I2, onPointClick }) => {
    const canvasRef = useRef(null);
    const scale = 50; // Например, 50 пикселей на 1 метр

    // Определяем положение диэлектрика по Y
    const dielectricY = 300; // Допустим, на 300 пикселей сверху от начала канваса

    // Положения проводников (в пикселях относительно канваса)
    // Эти значения будут зависеть от h1, h2 и масштаба
    // Пусть проводник 1 находится над диэлектриком, проводник 2 под
    const conductor1X = 400;
    const conductor1Y = dielectricY - h1 * scale;

    const conductor2X = 400;
    const conductor2Y = dielectricY + h2 * scale;


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const drawField = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Рисуем диэлектрик
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, dielectricY);
            ctx.lineTo(canvas.width, dielectricY);
            ctx.stroke();
            ctx.fillText(`μ1 (над)`, 10, dielectricY - 10);
            ctx.fillText(`μ2 (под)`, 10, dielectricY + 20);

            // Рисуем проводники
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(conductor1X, conductor1Y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillText(`I1: ${I1}A (на нас)`, conductor1X + 10, conductor1Y - 5);

            ctx.beginPath();
            ctx.arc(conductor2X, conductor2Y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillText(`I2: ${I2}A (от нас)`, conductor2X + 10, conductor2Y - 5);


            // Рисуем векторы поля
            const gridSize = 40; // Размер сетки для векторов
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.lineWidth = 1;

            for (let x = gridSize / 2; x < canvas.width; x += gridSize) {
                for (let y = gridSize / 2; y < canvas.height; y += gridSize) {
                    // Переводим пиксельные координаты в "физические" (относительно проводников)
                    const pointPhysX = (x - conductor1X) / scale; // x-координата относительно проводника 1
                    const pointPhysY = (y - conductor1Y) / scale; // y-координата относительно проводника 1

                    // Вычисляем B от проводника 1
                    let B1x = 0;
                    let B1y = 0;
                    const r1 = Math.sqrt((x - conductor1X) ** 2 + (y - conductor1Y) ** 2) / scale;
                    if (r1 > 0.01) { // Избегаем деления на ноль
                        const mu = y < dielectricY ? mu1 : mu2; // Упрощенно: проницаемость среды, где находится точка
                        const B_magnitude1 = (mu * I1) / (2 * Math.PI * r1);
                        // Направление: перпендикулярно радиусу. Для тока "на нас" (из экрана): (+y, -x)
                        B1x = B_magnitude1 * (y - conductor1Y) / (r1 * scale);
                        B1y = -B_magnitude1 * (x - conductor1X) / (r1 * scale);
                    }

                    // Вычисляем B от проводника 2
                    let B2x = 0;
                    let B2y = 0;
                    const r2 = Math.sqrt((x - conductor2X) ** 2 + (y - conductor2Y) ** 2) / scale;
                    if (r2 > 0.01) {
                        const mu = y < dielectricY ? mu1 : mu2; // Упрощенно
                        const B_magnitude2 = (mu * I2) / (2 * Math.PI * r2);
                        // Для тока "от нас" (в экран): (-y, +x)
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

        // Здесь ты будешь вычислять поле в точке mouseX, mouseY
        // и передавать его в onPointClick
        const mu = mouseY < dielectricY ? mu1 : mu2;

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
            width={800}
            height={600}
            style={{ border: '1px solid black' }}
            onClick={handleClick}
        />
    );
};

export default FieldCanvas;