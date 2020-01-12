import React from "react";
import Head from "next/head";

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
        <Head>
          <title>Gameplan – Design Wonderful Semesters</title>
          <link rel="shortcut icon" href="/favicon.png" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Quicksand:400,700&display=swap"
          />
        </Head>

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
