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

    <div className="flex justify-center">
      <div className="w-40 h-24 rounded p-2 bg-purple-500 shadow relative">
        <h2 className="font-bold text-xs tracking-widest font-mono mb-2">
          ES_APPM 252-1
        </h2>
        <h1>Integral Calculus</h1>

        <div className="absolute bottom-0 right-0 text-xs p-1 bg-purple-700 leading-none rounded-br rounded-tl cursor-pointer">
          Edit
        </div>
      </div>
    </div>
  </main>
);

export default Home;
