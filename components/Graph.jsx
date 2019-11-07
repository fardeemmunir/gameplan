import React, { useContext } from "react";

import Store from "../lib/store";
import makeLinks from "../lib/makeLinks";
import NetworkGraph from "./NetworkGraph";

const Graph = () => {
  const { classList: nodes } = useContext(Store);
  const links = makeLinks(
    nodes.map(({ code, prereqs }) => ({ node: code, pointsTo: prereqs }))
  );

  return (
    <>
      <div className="w-full text-center mt-8">
        <p>Total Classes: {nodes.length}</p>
      </div>
      <NetworkGraph nodes={nodes} links={links} />;
    </>
  );
};

export default Graph;
