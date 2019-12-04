import React, { useContext, useState } from "react";

import Store, { ClassInfoInterface } from "../lib/store";
import makeLinks from "../lib/makeLinks";
import NetworkGraph from "./NetworkGraph";
import Share from "./Share";

const Graph = () => {
  const { classList: nodes } = useContext(Store);
  const links = makeLinks(
    nodes.map(({ code, prereqs }) => ({ node: code, pointsTo: prereqs }))
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [linkDistance, setLinkDistance] = useState(150);
  const [nodeDistance, setNodeDistance] = useState(900);

  /**
   * @param {ClassInfoInterface[]} nodes
   */
  function mapNodesToSearchTerm(nodes) {
    return nodes.map(node => {
      if (searchTerm.trim() === "") return node;
      const searchExp = new RegExp(searchTerm, "gi");

      if (
        node.code.search(searchExp) > -1 ||
        node.name.search(searchExp) > -1
      ) {
        return { ...node, isSearched: true };
      } else return { ...node, isSearched: false };
    });
  }

  return (
    <>
      <div className="w-full text-center mt-8 flex justify-between items-center container">
        <div className="flex items-center">
          <input
            className="bg-transparent focus:outline-none border border-gray-300 rounded py-2 px-4 mr-4 block w-full appearance-none leading-normal"
            type="search"
            placeholder="Search Classes"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="text-left mr-4">
            <h1 className="text-sm">Link Distance</h1>
            <input
              type="range"
              className="range"
              min="100"
              max="300"
              value={linkDistance}
              onChange={e => setLinkDistance(Number(e.target.value))}
            />
          </div>
          <div className="text-left">
            <h1 className="text-sm">Node Distance</h1>
            <input
              type="range"
              className="range"
              min="500"
              max="1500"
              value={nodeDistance}
              onChange={e => setNodeDistance(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex items-center">
          <p className="opacity-75 mr-4">Total Classes: {nodes.length}</p>
          {searchTerm.length > 0 && (
            <p className="opacity-75 mr-4">
              Search Results:{" "}
              {
                mapNodesToSearchTerm(nodes).filter(
                  // @ts-ignore
                  ({ isSearched }) => isSearched
                ).length
              }
            </p>
          )}
          <Share />
        </div>
      </div>
      <NetworkGraph
        nodes={mapNodesToSearchTerm(nodes)}
        links={links}
        linkDistance={linkDistance}
        nodeDistance={nodeDistance}
        isSearching={!!searchTerm}
      />
    </>
  );
};

export default Graph;
