import React, { useContext, useState } from "react";

import Store, { ClassInfoInterface } from "../lib/store";
import makeLinks from "../lib/utils/makeLinks";
import NetworkGraph from "./NetworkGraph";
import Share from "./Share";
import ListView from "./ListView";

const Graph = () => {
  const { classList: nodes } = useContext(Store);
  const links = makeLinks(
    nodes.map(({ code, prereqs }) => ({ node: code, pointsTo: prereqs }))
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [linkDistance, setLinkDistance] = useState(150);
  const [nodeDistance, setNodeDistance] = useState(900);
  const [showGraph, setShowGraph] = useState(true);

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

  const GraphView = () => (
    <NetworkGraph
      nodes={mapNodesToSearchTerm(nodes)}
      links={links}
      linkDistance={linkDistance}
      nodeDistance={nodeDistance}
      isSearching={!!searchTerm}
    />
  );

  const ListViewWithOptions = () => (
    <ListView
      classList={mapNodesToSearchTerm(nodes)
        .filter(
          // @ts-ignore
          ({ isSearched }) => {
            if (searchTerm.length > 0) return isSearched;
            return true;
          }
        )
        .map(info => ({
          ...info,
          prereqs: info.prereqs.join(", "),
          quarterPref: info.quarterPref.join(", ").toLowerCase()
        }))}
    />
  );

  return (
    <article>
      <div className="w-full text-center mt-8 mb-4 flex justify-between items-center container">
        <div className="flex items-center">
          <style jsx>{`
            .toggle-btn {
              min-width: 8rem;
            }
          `}</style>
          <button
            onClick={() => setShowGraph(!showGraph)}
            className="block toggle-btn p-2 mr-4 bg-blue-600 rounded form__submit mb-0 whitespace-no-wrap"
          >
            {!showGraph ? "Graph View" : "List View"}
          </button>
          <input
            className="bg-transparent focus:outline-none border border-gray-300 rounded py-2 px-4 mr-4 block w-full appearance-none leading-normal"
            type="search"
            placeholder="Search Classes"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          <div className={"text-left mr-4 " + (!showGraph && "invisible")}>
            <h1 className="text-sm">Link Distance</h1>
            <input
              type="range"
              className="range"
              min="100"
              max="300"
              defaultValue={linkDistance}
              onChange={e => setLinkDistance(Number(e.target.value))}
            />
          </div>
          <div className={"text-left " + (!showGraph && "invisible")}>
            <h1 className="text-sm">Node Distance</h1>
            <input
              type="range"
              className="range"
              min="500"
              max="1500"
              defaultValue={nodeDistance}
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

      {(() => {
        if (nodes.length === 0) {
          return (
            <div className="my-48">
              <img className="w-1/4 mx-auto" src="/plan.png" alt="" />
              <p className="text-xl tracking-wider text-center opacity-50">
                Add some classes
              </p>
            </div>
          );
        } else {
          if (showGraph) {
            return <GraphView />;
          } else {
            return <ListViewWithOptions />;
          }
        }
      })()}
    </article>
  );
};

export default Graph;
