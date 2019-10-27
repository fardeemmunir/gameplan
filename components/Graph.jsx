import React, { useEffect } from "react";
import * as d3 from "d3";

import data from "./data";

const Graph = () => {
  useEffect(() => {
    const links = data.links.map(d => Object.create(d));
    const nodes = data.nodes.map(d => Object.create(d));

    const width = 1136;
    const height = 1002;

    const simulation = d3
      .forceSimulation(nodes)
      // @ts-ignore
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .select("#put-svg-here")
      .append("svg")
      .attr("viewBox", [-width / 2, -height / 3, width, height]);

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line");
    // .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg
      .append("g")
      .selectAll(".node")
      .data(nodes)
      .join("g")
      .attr("class", "node")
      // .join("circle")
      // .attr("r", 5)
      // .attr("fill", color)
      .call(drag(simulation));

    node
      .append("circle")
      .attr("r", 5)
      .attr("fill", color)
      .attr("x", -8)
      .attr("y", -8);

    node
      .append("text")
      .attr("class", "text-xs text-white")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(d => d.id.substring(0, 3));

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("transform", d => {
        return "translate(" + d.x + "," + d.y + ")";
      });
    });

    function color(group) {
      // console.log(group);
      return Math.random() > 0.2 ? "#957AE6" : "#CB4C49";
    }

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
  });

  return <div id="put-svg-here"></div>;
};

export default Graph;
