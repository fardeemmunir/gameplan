import React from "react";

import "../styles/main.css";

import { StoreProvider } from "../lib/store";
import Header from "../components/Header";
import ClassForm from "../components/ClassForm";
import ClassDetails from "../components/ClassDetails";
import Footer from "../components/Footer";
import Visuals from "../components/Visuals";

const Home = () => {
  return (
    <StoreProvider stateFromServer={null}>
      <main>
        <div className="container">
          <Header />
          <ClassForm />
        </div>
        <ClassDetails />

        <Visuals />
        <Footer />
      </main>
    </StoreProvider>
  );
};

export default Home;
