import React from "react";
import Head from "next/head";

import Header from "../components/header";

import "../styles/main.css";

const Home = () => (
  <main>
    <Head>
      <title>Gameplan – Design Wonderful Semesters</title>
      <link rel="shortcut icon" href="/favicon.png" />
    </Head>

    <Header />
  </main>
);

export default Home;
