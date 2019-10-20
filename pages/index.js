import React from "react";
import Head from "next/head";
import Nav from "../components/nav";

import "../styles/index.css";

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="p-4 shadow rounded bg-white">
      <h1 className="text-purple-500 leading-normal">Next.js</h1>
      <p className="text-gray-500">with Tailwind CSS</p>
    </div>
  </div>
);

export default Home;
