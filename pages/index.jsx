import React from "react";
import Head from "next/head";

import Header from "../components/Header";

import "../styles/main.css";
import AddClassForm from "../components/AddClassForm";

import { StoreProvider } from "../lib/store";
import Graph from "../components/graph";
import Schedule from "../components/Schedule";

const Home = () => {
  return (
    <StoreProvider>
      <main>
        <Head>
          <title>Gameplan – Design Wonderful Semesters</title>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>

        <div className="container">
          <Header />
          <AddClassForm />
        </div>

        <Graph />
        <Schedule />
      </main>
    </StoreProvider>
  );
};

export default Home;
