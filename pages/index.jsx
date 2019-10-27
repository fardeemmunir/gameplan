import React, { useContext } from "react";
import Head from "next/head";

import Header from "../components/Header";

import "../styles/main.css";
import AddClassForm from "../components/AddClassForm";

import Store, { StoreProvider } from "../lib/store";
import Graph from "../components/graph";

const Home = () => {
  return (
    <StoreProvider>
      <main>
        <Head>
          <title>Gameplan – Design Wonderful Semesters</title>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>

        <Header />

        <div className="container">
          <AddClassForm />
          <div className="flex justify-center">{/* <ClassList /> */}</div>
          <Graph />
        </div>
      </main>
    </StoreProvider>
  );
};

export default Home;
