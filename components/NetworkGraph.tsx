import React, { useRef, useEffect, useState, useMemo } from "react";
import * as d3 from "d3";

import color from "../lib/utils/scoreToColor";
import { useStore } from "../lib/store";
import { setClassToEdit } from "../lib/reducer";
import makeLinksFromClassList from "../lib/utils/makeLinks";

type Node = {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
};

const useGraphData = () => {
  const { classList } = useStore();

  const nodes: Node[] = useMemo(() => {
    return classList.map(info => ({
      id: info.id,
      color: color(info.interest - info.difficulty),
      label: info.code,
      x: 0,
      y: 0
    }));
  }, [classList, classList.length]);

  const links = useMemo(() => {
    return makeLinksFromClassList(classList);
  }, [classList, classList.length]);

  return {
    nodes,
    links
  };
};

interface Props {
  linkDistance: number;
  nodeDistance: number;
  searchTerm: string;
}

const NetworkGraph = ({ linkDistance, nodeDistance, searchTerm }: Props) => {
  const { dispatch } = useStore();
  const { nodes, links } = useGraphData();

  const svgContainer = useRef(null);

  const [width, setWidth] = useState(1180);
  const [height, setHeight] = useState(1000);

  useEffect(() => {
    setWidth(window.innerWidth - 100);

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

    const svg = d3.select(svgContainer.current);

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
      // @ts-ignore
      .call(drag(simulation));

    node
      .append("circle")
      .attr("class", "cursor-pointer network__node")
      .attr("r", 10)
      .attr("fill", d => d.color)
      .attr("x", -8)
      .attr("y", -8)
      .on("click", d => {
        dispatch(setClassToEdit(d.id));
      });

    node
      .append("text")
      .attr("dx", 20)
      .attr("dy", ".45em")
      .text(d => d.label)
      .attr("class", d => {
        const searchExp = new RegExp(searchTerm, "gi");

        const isBolded =
          searchTerm.trim() !== "" && d.label.search(searchExp) > -1;

        return `text-green text-xs  ${isBolded && "font-bold searched-item"}`;
      });

    simulation.on("tick", () => {
      let max = 0;
      let min = 0;
      for (const node of nodes) {
        max = Math.max(max, node.y);
        min = Math.min(min, node.y);
      }

      requestAnimationFrame(() => {
        setHeight(max + Math.abs(min) + 150);
      });

      link
        .attr("x2", d => d.source.x)
        .attr("y2", d => d.source.y)
        .attr("x1", d => d.target.x)
        .attr("y1", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
      svgContainer.current.innerHTML = "";
    };
  }, [nodes, links, linkDistance, nodeDistance, searchTerm]);

  return (
    <section className="relative w-full px-8">
      <div
        className={`w-full ${searchTerm.trim() !== "" &&
          "network--is-searched"}`}
      >
        <svg
          ref={svgContainer}
          viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
        >
          <defs>
            <marker
              id="arrowhead"
              viewBox="-0 -5 10 10"
              refX="13"
              refY="0"
              orient="auto"
              markerWidth="13"
              markerHeight="13"
              overflow="visible"
            >
              <path d="M 0,-3 L 5 ,0 L 0,3" fill="#999" stroke="none"></path>
            </marker>
          </defs>
        </svg>
      </div>
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
