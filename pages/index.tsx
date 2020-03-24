import React from "react";

import Header from "../components/Header";

import "../styles/main.css";
import ClassForm from "../components/ClassForm";

import { StoreProvider } from "../lib/store";
import Graph from "../components/Graph";
// import NewGraph from "../components/NewGraph";
// import Schedule from "../components/Schedule";
import ClassDetails from "../components/ClassDetails";
import Footer from "../components/Footer";

// const nodeCount = 100;
// const nodes = [];
// for (let i = 0; i < nodeCount; i++) {
//   nodes.push({
//     r: Math.random() * 5 + 2,
//     x: 0,
//     y: 0
//   });
// }

// const links = [];
// for (let i = 0; i < nodeCount; i++) {
//   let target = 0;
//   do {
//     target = Math.floor(Math.random() * nodeCount);
//   } while (target == i);
//   links.push({
//     source: i,
//     target
//   });
// }

const Home = () => {
  return (
    <StoreProvider stateFromServer={null}>
      <main>
        <div className="container">
          <Header />
          <ClassForm />
        </div>
        <ClassDetails />
        <Graph />
        {/* <NewGraph nodes={nodes} links={links} />,<Schedule /> */}
        <Footer />
      </main>
    </StoreProvider>
  );
};

export default Home;
