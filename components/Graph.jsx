import React, { useContext, useState } from "react";

import Store from "../lib/store";
import makeLinks from "../lib/makeLinks";
import NetworkGraph from "./NetworkGraph";

const Graph = () => {
  const { classList: nodes } = useContext(Store);
  const links = makeLinks(
    nodes.map(({ code, prereqs }) => ({ node: code, pointsTo: prereqs }))
  );

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="w-full text-center mt-8 flex justify-between items-center container">
        <div>
          <input
            className="bg-transparent focus:outline-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            type="text"
            placeholder="Search Classes"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <p>Total Classes: {nodes.length}</p>
        </div>
      </div>
      <NetworkGraph nodes={nodes} links={links} />;
    </>
  );
};

export default Graph;
