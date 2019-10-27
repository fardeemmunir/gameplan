import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

import color from "../lib/difficultyToColor";
const NetworkGraph = ({ nodes, links }) => {
  const svgContainer = useRef(null);

  useEffect(() => {
    const width = 1000;
    const height = 800;

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          // @ts-ignore
          .id(d => d.code)
          .distance(200)
      )
      .force("charge", d3.forceManyBody().strength(-800))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .select(svgContainer.current)
      .append("svg")
      .attr("viewBox", [-width / 2, -height / 2.5, width, height]);

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line");

    const node = svg
      .append("g")
      .selectAll(".node")
      .data(nodes)
      .join("g")
      .attr("class", "node")
      .call(drag(simulation));

    node
      .append("circle")
      .attr("r", 10)
      .attr("fill", color)
      .attr("x", -8)
      .attr("y", -8);

    node
      .append("text")
      .attr("class", "text-xs text-white")
      .attr("dx", 20)
      .attr("dy", ".45em")
      .text(d => d.code);

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    return () => {
      svgContainer.current.innerHTML = "";
    };
  });

  return <div className="w-full" ref={svgContainer}></div>;
};

function drag(simulation) {
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}

export default NetworkGraph;
