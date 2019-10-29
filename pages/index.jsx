import React, { useContext } from "react";
import Head from "next/head";

import Header from "../components/Header";

import "../styles/main.css";
import AddClassForm from "../components/AddClassForm";

import Store, { StoreProvider } from "../lib/store";
import Meta from "../components/Meta";
import Graph from "../components/graph";
import Schedule from "../components/Schedule";

const Home = () => {
  return (
    <StoreProvider>
      <main className="container">
        <Head>
          <title>Gameplan – Design Wonderful Semesters</title>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>

        <Header />
        <AddClassForm />
        <Meta />
        <Graph />
        <Schedule />
      </main>
    </StoreProvider>
  );
};

export default Home;
