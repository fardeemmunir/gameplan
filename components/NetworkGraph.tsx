import React, { useRef, useEffect, useContext } from "react";
import * as d3 from "d3";

import color from "../lib/utils/scoreToColor";
import Store from "../lib/store";
import { Class } from "../lib/reducer";
import { setClassToEdit } from "../lib/reducer";

type Node = Class & {
  x: number;
  y: number;
  isSearched: boolean;
};

type Link = {
  source: Node;
  target: Node;
  index: number;
};

const NetworkGraph = ({
  nodes,
  links,
  isSearching,
  linkDistance,
  nodeDistance
}) => {
  const { dispatch } = useContext(Store);
  const svgContainer = useRef(null);
  const height = 900;

  useEffect(() => {
    const width = window.innerWidth - 100;

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: Node) => d.id)
          .distance(linkDistance)
      )
      .force("charge", d3.forceManyBody().strength(nodeDistance * -1))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .select(svgContainer.current)
      .append("svg")
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`);

    d3.select(svgContainer.current)
      .select("svg")
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 13)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 13)
      .attr("markerHeight", 13)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-3 L 5 ,0 L 0,3")
      .attr("fill", "#999")
      .style("stroke", "none");

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("marker-end", "url(#arrowhead)");

    const node = svg
      .append("g")
      .selectAll(".node")
      .data(nodes)
      .join("g")
      .attr("class", "node")
      .call(drag(simulation));

    node
      .append("circle")
      .attr("class", "cursor-pointer network__node")
      .attr("r", 10)
      .attr("fill", (d: Node) => color(d.interest - d.difficulty))
      .attr("x", -8)
      .attr("y", -8)
      .on("click", (d: Node) => {
        dispatch(setClassToEdit(d.id));
      });

    node
      .append("text")
      .attr(
        "class",
        (d: Node) =>
          `text-green text-xs  ${d.isSearched && "font-bold searched-item"}`
      )
      .attr("dx", 20)
      .attr("dy", ".45em")
      .text((d: Node) => d.code);

    simulation.on("tick", () => {
      link
        .attr("x2", (d: Link) => d.source.x)
        .attr("y2", (d: Link) => d.source.y)
        .attr("x1", (d: Link) => d.target.x)
        .attr("y1", (d: Link) => d.target.y);

      node.attr("transform", (d: Node) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
      svgContainer.current.innerHTML = "";
    };
  }, [nodes, links, linkDistance, nodeDistance]);

  return (
    <section className="relative w-full px-8">
      <div
        className={"w-full " + (isSearching && "network--is-searched")}
        ref={svgContainer}
        style={{ minHeight: height }}
      ></div>
    </section>
  );
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
