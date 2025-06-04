import React, { useRef, useEffect, useState } from 'react';

const FieldCanvas = ({ h1, h2, mu1, mu2, I1, I2, onPointClick }) => {
    const canvasRef = useRef(null);
    const scale = 50; // масштабчик

    const [clickedPointData, setClickedPointData] = useState(null); // последний клик

    const canvasWidth = 1000;
    const canvasHeight = 750;
    const borderY = canvasHeight / 2; // граница сред

    const conductor1X = canvasWidth / 2;
    const conductor1Y = borderY - h1 * scale;

    const conductor2X = canvasWidth / 2;
    const conductor2Y = borderY + h2 * scale;


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const drawField = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // ластиком прошлись

            // ===== граница сред =====
            ctx.strokeStyle = '#0080ff';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(0, borderY);
            ctx.lineTo(canvas.width, borderY);
            ctx.stroke();
            ctx.font = 'bold 14px Verdana';
            ctx.fillStyle = '#6A11CBFF'; // цвет текста
            ctx.fillText(`μ1`, 10, borderY - 10);
            ctx.fillText(`μ2`, 10, borderY + 20);

            // ===== первый проводник (на нас) =====
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(conductor1X, conductor1Y, 8, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(conductor1X, conductor1Y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#6A11CBFF';
            ctx.fillText(`I1: ${I1}A (на нас)`, conductor1X + 15, conductor1Y - 5);

            // ===== второй проводник (от нас) =====
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(conductor2X, conductor2Y, 8, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(conductor2X - 5, conductor2Y - 5);
            ctx.lineTo(conductor2X + 5, conductor2Y + 5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(conductor2X + 5, conductor2Y - 5);
            ctx.lineTo(conductor2X - 5, conductor2Y + 5);
            ctx.stroke();
            ctx.fillStyle = '#6A11CBFF';
            ctx.fillText(`I2: ${I2}A (от нас)`, conductor2X + 15, conductor2Y - 5);


            // ===== вектора =====
            const gridSize = 40;
            //ctx.strokeStyle = '#9a8faa';
            //ctx.lineWidth = 1;

            for (let x = gridSize / 2; x < canvas.width; x += gridSize) {
                for (let y = gridSize / 2; y < canvas.height; y += gridSize) {

                    let B1, B2;

                    if (y > borderY) {
                        B1 = calculateBField(x, y, conductor1X, conductor1Y, I1, mu1, scale, 1);
                    } else if (y < borderY) {
                        B1 = calculateMirrored(x, y, conductor1X, conductor1Y, I1, mu2, scale, 1);
                    } else {
                        B1 = { Bx: 0, By: 0 };
                    }

                    if (y < borderY) {
                        B2 = calculateBField(x, y, conductor2X, conductor2Y, I2, mu2, scale, -1);
                    } else if (y > borderY) {
                        B2 = calculateMirrored(x, y, conductor2X, conductor2Y, I2, mu1, scale, -1);
                    } else {
                        B2 = { Bx: 0, By: 0 };
                    }

                    const B_totalX = B1.Bx + B2.Bx;
                    const B_totalY = B1.By + B2.By;
                    const magnitude = Math.hypot(B_totalX, B_totalY); // типо длина
                    const lenCof = Math.min(1e5, gridSize / (2 * magnitude));
                    const pLen = Math.max(4, 0.5 * lenCof * magnitude); // длина наконечника
                    const endX = x + B_totalX * lenCof;
                    const endY = y + B_totalY * lenCof;

                    drawArrow(ctx, x, y, endX, endY, '#9a8faa', 1, pLen);
                }
            }

            // ===== вектора B, B1, B2 =====
            if (clickedPointData) {
                const { x, y, B1x_phys, B1y_phys, B2x_phys, B2y_phys, B_totalX_phys, B_totalY_phys } = clickedPointData;

                // чтоб красиво выглядело
                const vectorDisplayScale = 1e5 * scale * 0.05;

                // кружок
                ctx.fillStyle = 'red';
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fill();

                // B1
                drawVector(ctx, x, y, B1x_phys, B1y_phys, vectorDisplayScale, 'blue', 'B1');
                // B2
                drawVector(ctx, x, y, B2x_phys, B2y_phys, vectorDisplayScale, 'deeppink', 'B2');
                // B
                drawVector(ctx, x, y, B_totalX_phys, B_totalY_phys, vectorDisplayScale,
                    '#6A11CBFF', 'B',3,'bold 14px Verdana');
            }
        };

        drawField();
    }, [h1, h2, mu1, mu2, I1, I2, borderY, conductor1X, conductor1Y, conductor2X, conductor2Y, clickedPointData]);


    const handleClick = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const mu = mouseY < borderY ? mu1 : mu2; // мю там куда кликнули

        const { Bx: B1x_phys, By: B1y_phys } = calculateBField(mouseX, mouseY,
            conductor1X, conductor1Y, I1, mu, scale, 1);
        const { Bx: B2x_phys, By: B2y_phys } = calculateBField(mouseX, mouseY,
            conductor2X, conductor2Y, I2, mu, scale, -1);

        const B_totalX_phys = B1x_phys + B2x_phys;
        const B_totalY_phys = B1y_phys + B2y_phys;
        const B_total_magnitude = Math.hypot(B_totalX_phys, B_totalY_phys);

        // обновляем состояние
        setClickedPointData({
            x: mouseX,
            y: mouseY,
            B_magnitude: B_total_magnitude,
            B_x: B_totalX_phys,
            B_y: B_totalY_phys,
            mu: mu,
            B1x_phys, B1y_phys,
            B2x_phys, B2y_phys,
            B_totalX_phys, B_totalY_phys
        });

        onPointClick({
            x: mouseX,
            y: mouseY,
            B_magnitude: B_total_magnitude,
            B_x: B_totalX_phys,
            B_y: B_totalY_phys,
            mu: mu,
        });
    };

    function calculateMirrored(x, y, conductorX, conductorY, I, mu, scale, direction = 1) {
        const k = conductorY > borderY // проверяем где источник
            ? (mu2 - mu1) / (mu2 + mu1)
            : (mu1 - mu2) / (mu1 + mu2);

        const mirroredY = 2 * borderY - conductorY;
        const imageI = k * I;

        return calculateBField(x, y, conductorX, mirroredY, imageI, mu, scale, direction);
    }

    function calculateBField(x, y, conductorX, conductorY, I, mu, scale, direction = 1) {
        const dx = (x - conductorX) / scale;
        const dy = (y - conductorY) / scale;
        const r = Math.hypot(dx, dy);

        if (r < 0.01) return { Bx: 0, By: 0 };

        const B_magnitude = (mu * I) / (2 * Math.PI * r);
        const Bx = direction * B_magnitude * (-dy / r);
        const By = direction * B_magnitude * (dx / r);

        return { Bx, By };
    }

    function drawVector(ctx, x, y, vecX, vecY, scale, color, label,
                        lineWidth = 2, font = 'bold 12px Verdana') {
        drawArrow(ctx, x, y, x + vecX * scale, y + vecY * scale, color, lineWidth, 10);
        ctx.fillStyle = color;
        ctx.font = font;
        ctx.fillText(label, x + vecX * scale + 5, y + vecY * scale - 5);
    }


    const drawArrow = (ctx, startX, startY, endX, endY, color = '#9a8faa', lineWidth = 2, pointerLen) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // наконечник
        const pointer = pointerLen; // длина наконечника
        const angle = Math.atan2(endY - startY, endX - startX);
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - pointer * Math.cos(angle - Math.PI / 6),
            endY - pointer * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - pointer * Math.cos(angle + Math.PI / 6),
            endY - pointer * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    };


    // сброс информации о клике при движении слайдеров
    useEffect(() => {
        setClickedPointData(null);
    }, [h1, h2, mu1, mu2, I1, I2]); // на все слайдеры

    return (
        <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            style={{ border: '1px solid black' }}
            onClick={handleClick}
        />
    );
};

export default FieldCanvas;
