import React, { useContext, useState } from "react";

import Store, { ClassInfoInterface } from "../lib/store";
import makeLinks from "../lib/makeLinks";
import NetworkGraph from "./NetworkGraph";

const Graph = () => {
  const { classList: nodes } = useContext(Store);
  const links = makeLinks(
    nodes.map(({ code, prereqs }) => ({ node: code, pointsTo: prereqs }))
  );

  const [searchTerm, setSearchTerm] = useState("");

  /**
   * @param {ClassInfoInterface[]} nodes
   */
  function mapNodesToSearchTerm(nodes) {
    return nodes.map(node => {
      if (searchTerm === "") return node;
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
        <div>
          <input
            className="bg-transparent focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal"
            type="search"
            placeholder="Search Classes"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value.trim())}
          />
        </div>

        <div>
          <p>Total Classes: {nodes.length}</p>
        </div>
      </div>
      <NetworkGraph
        nodes={mapNodesToSearchTerm(nodes)}
        links={links}
        isSearching={!!searchTerm}
      />
    </>
  );
};

export default Graph;
