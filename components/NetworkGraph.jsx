import React, { useRef, useEffect, useState, useContext } from "react";
import * as d3 from "d3";

import color from "../lib/difficultyToColor";
import ClassCard from "./ClassCard";
import Store from "../lib/store";

const NetworkGraph = ({ nodes, links, isSearching }) => {
  const { classList, editClass, dispatch } = useContext(Store);
  const svgContainer = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedClass, setSelectedClass] = useState({
    code: "",
    name: "",
    quarterPref: [],
    interest: 1,
    difficulty: 0
  });

  const height = nodes.length > 15 ? 1100 : 900;

  useEffect(() => {
    if (selectedClass.code && editClass !== "")
      setSelectedClass(
        classList.find(({ code }) => code === selectedClass.code)
      );
    if (editClass === "") {
      setShowTooltip(false);
    }
  }, [editClass]);

  useEffect(() => {
    const width = window.innerWidth - 100;

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
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .select(svgContainer.current)
      .append("svg")
      // @ts-ignore
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

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
      .attr("fill", d => color(d.difficulty))
      .attr("x", -8)
      .attr("y", -8)
      .on("click", d => {
        setShowTooltip(true);
        setSelectedClass(d);
        dispatch({
          type: "EDIT_CLASS",
          payload: {
            classCode: d.code
          }
        });
      });

    node
      .append("text")
      .attr("class", d => {
        return (
          "text-green text-xs " +
          (d.isSearched ? "font-bold searched-item" : "")
        );
      })
      .attr("dx", 20)
      .attr("dy", ".45em")
      .text(d => d.code);

    simulation.on("tick", () => {
      link
        .attr("x2", d => d.source.x)
        .attr("y2", d => d.source.y)
        .attr("x1", d => d.target.x)
        .attr("y1", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    return () => {
      svgContainer.current.innerHTML = "";
    };
  }, [nodes, links]);

  return (
    <section className="relative w-full px-8">
      <div
        className={"w-full " + (isSearching && "network--is-searched")}
        ref={svgContainer}
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
