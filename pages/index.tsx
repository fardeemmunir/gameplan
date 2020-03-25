import React from "react";

import "../styles/main.css";

import { StoreProvider } from "../lib/store";
import Header from "../components/Header";
import ClassForm from "../components/ClassForm";
import Graph from "../components/Graph";
import Schedule from "../components/Schedule";
import ClassDetails from "../components/ClassDetails";
import Footer from "../components/Footer";

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
        <Schedule />

        <Footer />
      </main>
    </StoreProvider>
  );
};

export default Home;
