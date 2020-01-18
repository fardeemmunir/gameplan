import React from "react";

import Header from "../components/Header";

import "../styles/main.css";
import AddClassForm from "../components/AddClassForm";

import { StoreProvider } from "../lib/store";
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
          <AddClassForm />
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
