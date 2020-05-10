import React, { useState } from "react";

import { useStore } from "../lib/store";
import NetworkGraph from "./NetworkGraph";
import Share from "./Share";
import ListView from "./ListView";
import { Class } from "../lib/reducer";

const Graph = () => {
  const { classList } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [linkDistance, setLinkDistance] = useState(150);
  const [nodeDistance, setNodeDistance] = useState(900);
  const [showGraph, setShowGraph] = useState(true);

  function mapClassToSearch(classInfo: Class): Class & { isSearched: boolean } {
    const searchExp = new RegExp(searchTerm, "gi");

    if (
      searchTerm.trim() !== "" &&
      (classInfo.code.search(searchExp) > -1 ||
        classInfo.name.search(searchExp) > -1)
    ) {
      return { ...classInfo, isSearched: true };
    } else return { ...classInfo, isSearched: false };
  }

  return (
    <article>
      <div className="w-full text-center mt-8 mb-4 flex flex-col md:flex-row justify-between items-center container">
        <div className="flex w-full md:w-auto items-center mb-4 md:mb-0">
          <button
            onClick={() => setShowGraph(!showGraph)}
            className="block toggle-btn p-2 mr-4 bg-blue-600 rounded form__submit mb-0 whitespace-no-wrap"
          >
            {!showGraph ? "Graph View" : "List View"}
          </button>
          <input
            className="bg-transparent focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal"
            type="search"
            placeholder="Search Classes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div
            className={
              "hidden lg:block text-left mx-4 " + (!showGraph && "invisible")
            }
          >
            <h1 className="text-sm">Link Distance</h1>
            <input
              type="range"
              className="range"
              min="100"
              max="300"
              defaultValue={linkDistance}
              onChange={(e) => setLinkDistance(Number(e.target.value))}
            />
          </div>
          <div
            className={
              "hidden lg:block text-left " + (!showGraph && "invisible")
            }
          >
            <h1 className="text-sm">Node Distance</h1>
            <input
              type="range"
              className="range"
              min="500"
              max="1500"
              defaultValue={nodeDistance}
              onChange={(e) => setNodeDistance(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex justify-between w-full md:w-auto items-center">
          <p className="opacity-75 mr-4">Total Classes: {classList.length}</p>
          {searchTerm.length > 0 && (
            <p className="opacity-75 mr-4">
              Search Results:{" "}
              {
                classList
                  .map(mapClassToSearch)
                  .filter(({ isSearched }) => isSearched).length
              }
            </p>
          )}
          <Share />
        </div>
      </div>

      {showGraph ? (
        <NetworkGraph
          linkDistance={linkDistance}
          nodeDistance={nodeDistance}
          searchTerm={searchTerm}
        />
      ) : (
        <ListView
          classList={classList
            .map(mapClassToSearch)
            .filter(({ isSearched }) => {
              if (searchTerm.length > 0) return isSearched;
              return true;
            })
            .map((info) => ({
              ...info,
              quarterPref: info.quarterPref.join(", ").toLowerCase(),
              prereqs: info.prereqs
                .map(
                  (classId) => classList.find(({ id }) => id === classId).name
                )
                .join(", "),
            }))}
        />
      )}
    </article>
  );
};

export default Graph;
