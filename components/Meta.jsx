import React, { useContext } from "react";

import Store from "../lib/store";

const Meta = () => {
  const { classList } = useContext(Store);

  return (
    <div className="w-full text-center mt-8">
      <p>Total Classes: {classList.length}</p>
    </div>
  );
};

export default Meta;
