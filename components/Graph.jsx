import React, { useContext } from "react";

import Store from "../lib/store";
import NetworkGraph from "./NetworkGraph";

const Graph = () => {
  const { classList } = useContext(Store);

  return (
    <div>
      <NetworkGraph
        nodes={classList}
        links={[{ source: "ES_APPM 252-1", target: "ES_APPM 252-2" }]}
      />
    </div>
  );
};

export default Graph;
