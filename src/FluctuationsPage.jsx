// src/pages/FluctuationsPage.jsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const FluctuationsPage = () => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const nodes = [
      { id: 'A', x: width / 2, y: height / 4, charge: 1 },
      { id: 'B', x: width / 2 - 100, y: (3 * height) / 4, charge: 1 },
      { id: 'C', x: width / 2 + 100, y: (3 * height) / 4, charge: 1 },
    ];

    const circles = svg.selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', 'red');

    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength((d) => -100 * d.charge))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', () => {
        circles
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y);
      });

    setTimeout(() => {
      simulation.force('link', null); // "Перерезаем" нижнюю проволоку
    }, 3000);

  }, []);

  return (
    <div>
      <h2>Колебания зарядов</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default FluctuationsPage;
