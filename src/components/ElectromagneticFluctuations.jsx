import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web';

const ElectromagneticFluctuations = () => {
    // const canvasRef = useRef(null);
    // const animationFrameRef = useRef(null);
    // const [isRunning, setIsRunning] = useState(false);
    
    // // Физические константы
    // const CHARGE = 0.4; // Заряд в кулонах (еще увеличен для сильных сил)
    // const MASS = 1; // Масса в кг (еще уменьшена для высокой отзывчивости)
    // const K = 8.99e9; // Электрическая постоянная
    // const TRIANGLE_SIZE = 100; // Размер треугольника в пикселях
    // const DAMPING = 0.99; // Коэффициент затухания
    // const G = 9.81; // Ускорение свободного падения
    // const GRAVITY_SCALE = 0.4; // Масштабный коэффициент для силы тяжести
    // const SIMULATION_SPEED_MULTIPLIER = 4; // Increase to speed up simulation
    // const TOP_CHARGE_PENDULUM_ARM_LENGTH = 75; // Длина маятника уменьшена
    
    // // Состояние зарядов
    // const [charges, setCharges] = useState(() => {
    //     const height = Math.sqrt(3) * TRIANGLE_SIZE / 2;
    //     const initialTopY = -height/2; // approx -43.3
    //     const initialTopX = 20; // Увеличен начальный горизонтальный сдвиг
    //     return [
    //         { // Top charge (will oscillate)
    //             x: initialTopX, y: initialTopY, 
    //             vx: 0, vy: 0, 
    //             fixed: false,
    //             anchorX: initialTopX, 
    //             anchorY: initialTopY - TOP_CHARGE_PENDULUM_ARM_LENGTH, // -43.3 - 75 = -118.3
    //             // wireLength will be set by useEffect
    //         }, 
    //         { // Bottom-left charge (fixed)
    //             x: -TRIANGLE_SIZE/2, y: height/2, 
    //             vx: 0, vy: 0, 
    //             fixed: true,
    //             anchorX: -TRIANGLE_SIZE/2, // Anchored to its own position
    //             anchorY: height/2,
    //             // wireLength will be set to 0 by useEffect
    //         }, 
    //         { // Bottom-right charge (fixed)
    //             x: TRIANGLE_SIZE/2, y: height/2, 
    //             vx: 0, vy: 0, 
    //             fixed: true,
    //             anchorX: TRIANGLE_SIZE/2, // Anchored to its own position
    //             anchorY: height/2,
    //             // wireLength will be set to 0 by useEffect
    //         }
    //     ];
    // });

    // // Инициализация длин проводников при первом рендере (restored to original logic)
    // useEffect(() => {
    //     setCharges(prevCharges => {
    //         return prevCharges.map(charge => ({
    //             ...charge,
    //             wireLength: Math.sqrt(
    //                 (charge.x - charge.anchorX) * (charge.x - charge.anchorX) +
    //                 (charge.y - charge.anchorY) * (charge.y - charge.anchorY)
    //             )
    //         }));
    //     });
    // }, []); // Runs once on mount

    // // Расчет силы между двумя зарядами
    // const calculateForce = useCallback((charge1, charge2) => {
    //     if (isRunning) {
    //         console.log(`[CalculateForce] Using CHARGE: ${CHARGE}`);
    //     }
    //     const dx = charge2.x - charge1.x;
    //     const dy = charge2.y - charge1.y;
    //     const distance = Math.sqrt(dx * dx + dy * dy);
    //     if (distance === 0) return { fx: 0, fy: 0 }; // Avoid division by zero
    //     const force = K * CHARGE * CHARGE / (distance * distance);
    //     return {
    //         fx: (force * dx) / distance,
    //         fy: (force * dy) / distance
    //     };
    // }, [K, CHARGE, isRunning]);

    // // Применение ограничения длины провода
    // const applyWireConstraint = useCallback((charge) => {
    //     // If wireLength is effectively zero, the charge is fixed at its anchor.
    //     if (charge.wireLength < 1e-6) {
    //         charge.x = charge.anchorX;
    //         charge.y = charge.anchorY;
    //         charge.vx = 0;
    //         charge.vy = 0;
    //         return;
    //     }

    //     const dx = charge.x - charge.anchorX;
    //     const dy = charge.y - charge.anchorY;
    //     const currentLength = Math.sqrt(dx * dx + dy * dy);

    //     if (currentLength < 1e-6) { // Particle is at the anchor point
    //         // This occurs if wireLength > 0 but the particle is at the pivot.
    //         // This is a singular state. To recover, we can place it on the wire
    //         // (e.g., directly below the anchor) and reset its velocity.
    //         charge.x = charge.anchorX;
    //         charge.y = charge.anchorY + charge.wireLength; // Position it on the circle
    //         charge.vx = 0;
    //         charge.vy = 0;
    //         return; 
    //     }
        
    //     const nx = dx / currentLength;
    //     const ny = dy / currentLength;
        
    //     // Корректируем положение
    //     charge.x = charge.anchorX + nx * charge.wireLength;
    //     charge.y = charge.anchorY + ny * charge.wireLength;
        
    //     // Корректируем скорость (проекция на касательную к окружности)
    //     const tangentX = -ny;
    //     const tangentY = nx;
    //     const dotProduct = charge.vx * tangentX + charge.vy * tangentY;
    //     charge.vx = tangentX * dotProduct;
    //     charge.vy = tangentY * dotProduct;
    // }, []); // No dependencies from component scope other than constants, which are stable

    // // Обновление состояния системы
    // const updateSystem = useCallback(() => {
    //     setCharges(prevCharges => {
    //         if (isRunning) {
    //             console.log(`[UpdateSystem] Using MASS: ${MASS}, DAMPING: ${DAMPING}, G: ${G}, GRAVITY_SCALE: ${GRAVITY_SCALE}`);
    //         }
    //         const newCharges = [...prevCharges];
    //         const topChargeOriginal = newCharges[0];
    //         const topCharge = { ...topChargeOriginal };

    //         if (!topCharge.fixed) {
    //             let totalFx = 0;
    //             let totalFy = 0;

    //             const forceFromBottomLeft = calculateForce(topCharge, newCharges[1]);
    //             totalFx += forceFromBottomLeft.fx;
    //             totalFy += forceFromBottomLeft.fy;

    //             const forceFromBottomRight = calculateForce(topCharge, newCharges[2]);
    //             totalFx += forceFromBottomRight.fx;
    //             totalFy += forceFromBottomRight.fy;
                
    //             totalFy += MASS * G * GRAVITY_SCALE;

    //             if (isRunning) { // Log only when simulation is supposed to be active
    //                 console.log(`[UpdateSystem] Before update: x=${topCharge.x.toFixed(5)}, y=${topCharge.y.toFixed(5)}, vx=${topCharge.vx.toFixed(5)}, vy=${topCharge.vy.toFixed(5)}`);
    //                 console.log(`[UpdateSystem] Forces: totalFx=${totalFx.toFixed(5)}, totalFy=${totalFy.toFixed(5)}`);
    //             }
                
    //             const dt = 0.016;
    //             const newVx = (topCharge.vx + totalFx / MASS * dt) * DAMPING;
    //             const newVy = (topCharge.vy + totalFy / MASS * dt) * DAMPING;
    //             const newX = topCharge.x + newVx * dt; // Use newVx for position update
    //             const newY = topCharge.y + newVy * dt; // Use newVy for position update

    //             topCharge.vx = newVx;
    //             topCharge.vy = newVy;
    //             topCharge.x = newX;
    //             topCharge.y = newY;

    //             if (isRunning) {
    //                 console.log(`[UpdateSystem] After vel/pos update: x=${topCharge.x.toFixed(5)}, y=${topCharge.y.toFixed(5)}, vx=${topCharge.vx.toFixed(5)}, vy=${topCharge.vy.toFixed(5)}`);
    //             }
                
    //             applyWireConstraint(topCharge);
    //             if (isRunning) {
    //                 console.log(`[UpdateSystem] After constraint: x=${topCharge.x.toFixed(5)}, y=${topCharge.y.toFixed(5)}, vx=${topCharge.vx.toFixed(5)}, vy=${topCharge.vy.toFixed(5)}`);
    //                 console.log("-----------------------------------------------------");
    //             }
    //         }
            
    //         newCharges[0] = topCharge;
    //         return newCharges;
    //     });
    // }, [setCharges, calculateForce, applyWireConstraint, MASS, G, GRAVITY_SCALE, DAMPING, isRunning]); // Added isRunning to dependencies

    // // Отрисовка
    // const draw = useCallback(() => {
    //     const canvas = canvasRef.current;
    //     if (!canvas) return;
    //     const ctx = canvas.getContext('2d');
    //     const centerX = canvas.width / 2;
    //     const centerY = canvas.height / 2;

    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
        
    //     ctx.beginPath();
    //     ctx.strokeStyle = '#666';
    //     ctx.lineWidth = 2;

    //     // 1. Draw pendulum wire for the top charge (from its anchor to its current position)
    //     if (!charges[0].fixed && charges[0].wireLength > 0) {
    //         ctx.moveTo(centerX + charges[0].anchorX, centerY + charges[0].anchorY);
    //         ctx.lineTo(centerX + charges[0].x, centerY + charges[0].y);
    //     }

    //     // 2. Draw "side wires" of the triangle (visual connection for forces)
    //     // From top charge to bottom-left
    //     ctx.moveTo(centerX + charges[0].x, centerY + charges[0].y);
    //     ctx.lineTo(centerX + charges[1].x, centerY + charges[1].y);
    //     // From top charge to bottom-right
    //     ctx.moveTo(centerX + charges[0].x, centerY + charges[0].y);
    //     ctx.lineTo(centerX + charges[2].x, centerY + charges[2].y);

    //     // 3. If system not running, draw the bottom wire (between fixed bottom charges)
    //     if (!isRunning) {
    //         ctx.moveTo(centerX + charges[1].x, centerY + charges[1].y);
    //         ctx.lineTo(centerX + charges[2].x, centerY + charges[2].y);
    //     }
        
    //     ctx.stroke();

    //     // Отрисовка зарядов
    //     charges.forEach((charge, index) => {
    //         ctx.beginPath();
    //         ctx.fillStyle = index === 0 ? '#4444ff' : '#ff4444';
    //         ctx.arc(centerX + charge.x, centerY + charge.y, 6, 0, Math.PI * 2);
    //         ctx.fill();
    //     });
    // }, [charges, isRunning]); // isRunning was missing, charges is a dependency

    // // Анимация
    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     canvas.width = 400;
    //     canvas.height = 400;
        
    //     const animate = () => {
    //         if (isRunning) {
    //             for (let i = 0; i < SIMULATION_SPEED_MULTIPLIER; i++) {
    //                 updateSystem();
    //             }
    //         }
    //         draw();
    //         animationFrameRef.current = requestAnimationFrame(animate);
    //     };
        
    //     animate();
        
    //     return () => {
    //         if (animationFrameRef.current) {
    //             cancelAnimationFrame(animationFrameRef.current);
    //         }
    //     };
    // }, [isRunning, updateSystem, draw, SIMULATION_SPEED_MULTIPLIER]); // SIMULATION_SPEED_MULTIPLIER is used here

    // const handleStart = () => {
    //     if (!isRunning) {
    //         setIsRunning(true);
    //     }
    // };

    // const handleReset = () => {
    //     setIsRunning(false);
    //     const height = Math.sqrt(3) * TRIANGLE_SIZE / 2;
    //     const initialTopY = -height/2;
    //     const initialTopX = 20; // Увеличен начальный горизонтальный сдвиг
    //     setCharges([
    //         { 
    //             x: initialTopX, y: initialTopY, 
    //             vx: 0, vy: 0, 
    //             fixed: false,
    //             anchorX: initialTopX,
    //             anchorY: initialTopY - TOP_CHARGE_PENDULUM_ARM_LENGTH,
    //             // wireLength will be set by useEffect after this state update triggers re-render if component remounts
    //             // However, for reset, it's better to explicitly set it if useEffect isn't guaranteed
    //         },
    //         { 
    //             x: -TRIANGLE_SIZE/2, y: height/2, 
    //             vx: 0, vy: 0, 
    //             fixed: true,
    //             anchorX: -TRIANGLE_SIZE/2,
    //             anchorY: height/2,
    //         },
    //         { 
    //             x: TRIANGLE_SIZE/2, y: height/2, 
    //             vx: 0, vy: 0, 
    //             fixed: true,
    //             anchorX: TRIANGLE_SIZE/2,
    //             anchorY: height/2,
    //         }
    //     ]);
    //     // Re-trigger wireLength calculation on reset by briefly changing charges then setting them fully
    //     // A more direct way would be to call a setter that also recalculates, or include wireLength here.
    //     // For now, will rely on the initial useEffect, but for robustness, handleReset should fully define state.
    //     // Let's explicitly set wireLengths in handleReset for clarity and robustness.
    //     setCharges(prev => prev.map(c => ({
    //         ...c,
    //         wireLength: Math.sqrt(
    //             (c.x - c.anchorX) * (c.x - c.anchorX) +
    //             (c.y - c.anchorY) * (c.y - c.anchorY)
    //         )
    //     })));
    // };

    return (
        <div style={{
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'center',
            // padding: '2rem'
        }}>
            {/* <h2>Колебания зарядов в треугольной системе</h2>
            <canvas
                ref={canvasRef}
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginBottom: '1rem'
                }}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    onClick={handleStart}
                    disabled={isRunning}
                    style={{
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        backgroundColor: isRunning ? '#ccc' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isRunning ? 'default' : 'pointer'
                    }}
                >
                    Запустить
                </button>
                <button
                    onClick={handleReset}
                    style={{
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Сбросить
                </button>
            </div>
            <div style={{
                marginTop: '2rem',
                maxWidth: '600px',
                textAlign: 'center'
            }}>
                <p>
                    В этой визуализации показан равнобедренный треугольник из проводников с зарядами в вершинах.
                    При нажатии кнопки "Запустить" нижний провод разрывается, и верхний заряд начинает колебаться
                    под действием электростатических сил от нижних зарядов.
                </p>
            </div> */}
            <iframe width="100%" height="500px" src="https://iwant2study.org/lookangejss/05electricitynmagnetism_21electromagnetism/ejss_model_CoulombPendulum/CoulombPendulum_Simulation.xhtml
" frameborder="0"></iframe>
        </div>
    );
};

export default ElectromagneticFluctuations; 