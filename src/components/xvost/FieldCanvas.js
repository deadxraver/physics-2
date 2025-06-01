import React, { useRef, useEffect, useState } from 'react'; // Импортируем useState

const FieldCanvas = ({ h1, h2, mu1, mu2, I1, I2, onPointClick }) => {
    const canvasRef = useRef(null);
    const scale = 50; // Например, 50 пикселей на 1 метр

    // Состояние для хранения данных о последней кликнутой точке
    const [clickedPointData, setClickedPointData] = useState(null);

    // Определяем положение диэлектрика по Y
    const dielectricY = 375; // Допустим, на 300 пикселей сверху от начала канваса

    // Положения проводников (в пикселях относительно канваса)
    // Эти значения будут зависеть от h1, h2 и масштаба
    // Пусть проводник 1 находится над диэлектриком, проводник 2 под
    const conductor1X = 500;
    const conductor1Y = dielectricY - h1 * scale;

    const conductor2X = 500;
    const conductor2Y = dielectricY + h2 * scale;

    // Вспомогательная функция для рисования стрелок
    const drawArrow = (ctx, startX, startY, endX, endY, color, lineWidth = 2) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Нарисовать наконечник стрелки
        const headlen = 10; // Длина наконечника стрелки
        const angle = Math.atan2(endY - startY, endX - startX);
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - headlen * Math.cos(angle - Math.PI / 6), endY - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - headlen * Math.cos(angle + Math.PI / 6), endY - headlen * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    };


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

            // --- Рисуем проводник 1 (кружок с точкой для тока "на нас") ---
            // В физике "на нас" обычно точка, "от нас" - крестик.
            // Здесь реализовано по вашему запросу: I1 (на нас) -> точка, I2 (от нас) -> крестик.
            ctx.strokeStyle = '#ff0000'; // Цвет обводки
            ctx.lineWidth = 1.5; // Толщина линии
            ctx.beginPath();
            ctx.arc(conductor1X, conductor1Y, 8, 0, Math.PI * 2); // Кружок
            ctx.stroke();
            // Точка в центре
            ctx.fillStyle = '#ff0000'; // Цвет точки
            ctx.beginPath();
            ctx.arc(conductor1X, conductor1Y, 3, 0, Math.PI * 2); // Точка
            ctx.fill();
            ctx.fillStyle = '#6A11CBFF'; // Цвет текста
            ctx.fillText(`I1: ${I1}A (на нас)`, conductor1X + 15, conductor1Y - 5);

            // --- Рисуем проводник 2 (кружок с крестиком для тока "от нас") ---
            ctx.strokeStyle = '#ff0000'; // Цвет обводки
            ctx.lineWidth = 1.5; // Толщина линии
            ctx.beginPath();
            ctx.arc(conductor2X, conductor2Y, 8, 0, Math.PI * 2); // Кружок
            ctx.stroke();
            // Крестик
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


            // Рисуем векторы поля на сетке
            const gridSize = 40; // Размер сетки для векторов
            ctx.strokeStyle = '#9a8faa'; // Цвет векторов
            ctx.lineWidth = 1;

            for (let x = gridSize / 2; x < canvas.width; x += gridSize) {
                for (let y = gridSize / 2; y < canvas.height; y += gridSize) {
                    const currentMu = y < dielectricY ? mu1 : mu2;

                    let B1x = 0, B1y = 0;
                    const r1 = Math.sqrt((x - conductor1X) ** 2 + (y - conductor1Y) ** 2) / scale;
                    if (r1 > 0.01) {
                        const B_magnitude1 = (currentMu * I1) / (2 * Math.PI * r1);
                        B1x = B_magnitude1 * (y - conductor1Y) / (r1 * scale);
                        B1y = -B_magnitude1 * (x - conductor1X) / (r1 * scale);
                    }

                    let B2x = 0, B2y = 0;
                    const r2 = Math.sqrt((x - conductor2X) ** 2 + (y - conductor2Y) ** 2) / scale;
                    if (r2 > 0.01) {
                        const B_magnitude2 = (currentMu * I2) / (2 * Math.PI * r2);
                        B2x = -B_magnitude2 * (y - conductor2Y) / (r2 * scale);
                        B2y = B_magnitude2 * (x - conductor2X) / (r2 * scale);
                    }

                    const B_totalX = B1x + B2x;
                    const B_totalY = B1y + B2y;
                    const B_total_magnitude = Math.sqrt(B_totalX ** 2 + B_totalY ** 2);

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

            // --- Рисуем векторы B1, B2 и B_total в кликнутой точке ---
            if (clickedPointData) {
                const { x, y, B1x_phys, B1y_phys, B2x_phys, B2y_phys, B_totalX_phys, B_totalY_phys } = clickedPointData;

                // Масштабирование векторов для отображения на канвасе
                const vectorDisplayScale = 1e5 * scale * 0.05; // Подбираем коэффициент для наглядности

                // Рисуем кружок в кликнутой точке
                ctx.fillStyle = 'red';
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fill();

                // Рисуем B1 (например, зеленый)
                const B1_endX = x + B1x_phys * vectorDisplayScale;
                const B1_endY = y + B1y_phys * vectorDisplayScale;
                drawArrow(ctx, x, y, B1_endX, B1_endY, 'blue', 2);
                ctx.fillStyle = 'blue';
                ctx.font = 'bold 12px Verdana';
                ctx.fillText('B1', B1_endX + 5, B1_endY - 5);


                // Рисуем B2 (например, синий)
                const B2_endX = x + B2x_phys * vectorDisplayScale;
                const B2_endY = y + B2y_phys * vectorDisplayScale;
                drawArrow(ctx, x, y, B2_endX, B2_endY, 'deeppink', 2);
                ctx.fillStyle = 'deeppink';
                ctx.font = 'bold 12px Verdana';
                ctx.fillText('B2', B2_endX + 5, B2_endY - 5);


                // Рисуем B_total (например, фиолетовый)
                const B_total_endX = x + B_totalX_phys * vectorDisplayScale;
                const B_total_endY = y + B_totalY_phys * vectorDisplayScale;
                drawArrow(ctx, x, y, B_total_endX, B_total_endY, '#6A11CBFF', 3);
                ctx.fillStyle = '#6A11CBFF';
                ctx.font = 'bold 14px Verdana';
                ctx.fillText('B', B_total_endX + 5, B_total_endY - 5);
            }
        };

        drawField();
    }, [h1, h2, mu1, mu2, I1, I2, dielectricY, conductor1X, conductor1Y, conductor2X, conductor2Y, clickedPointData]); // Добавляем clickedPointData в зависимости

    const handleClick = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Вычисляем поле в точке mouseX, mouseY
        const mu = mouseY < dielectricY ? mu1 : mu2; // Проницаемость среды в точке клика

        const r1 = Math.sqrt((mouseX - conductor1X) ** 2 + (mouseY - conductor1Y) ** 2) / scale;
        let B1x_phys = 0, B1y_phys = 0; // Физические компоненты B1
        if (r1 > 0.01) {
            const B_magnitude1 = (mu * I1) / (2 * Math.PI * r1);
            B1x_phys = B_magnitude1 * (mouseY - conductor1Y) / (r1 * scale);
            B1y_phys = -B_magnitude1 * (mouseX - conductor1X) / (r1 * scale);
        }

        const r2 = Math.sqrt((mouseX - conductor2X) ** 2 + (mouseY - conductor2Y) ** 2) / scale;
        let B2x_phys = 0, B2y_phys = 0; // Физические компоненты B2
        if (r2 > 0.01) {
            const B_magnitude2 = (mu * I2) / (2 * Math.PI * r2);
            B2x_phys = -B_magnitude2 * (mouseY - conductor2Y) / (r2 * scale);
            B2y_phys = B_magnitude2 * (mouseX - conductor2X) / (r2 * scale);
        }

        const B_totalX_phys = B1x_phys + B2x_phys; // Физические компоненты B_total
        const B_totalY_phys = B1y_phys + B2y_phys;
        const B_total_magnitude = Math.sqrt(B_totalX_phys ** 2 + B_totalY_phys ** 2);

        // Обновляем состояние с данными кликнутой точки
        setClickedPointData({
            x: mouseX,
            y: mouseY,
            B_magnitude: B_total_magnitude,
            B_x: B_totalX_phys, // Передаем физические компоненты для onPointClick
            B_y: B_totalY_phys,
            mu: mu,
            B1x_phys, B1y_phys, // Добавляем компоненты B1 для рисования
            B2x_phys, B2y_phys, // Добавляем компоненты B2 для рисования
            B_totalX_phys, B_totalY_phys // Добавляем компоненты B_total для рисования
        });

        // Вызываем внешний обработчик клика
        onPointClick({
            x: mouseX,
            y: mouseY,
            B_magnitude: B_total_magnitude,
            B_x: B_totalX_phys,
            B_y: B_totalY_phys,
            mu: mu,
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
