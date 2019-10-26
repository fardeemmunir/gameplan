import React from "react";
import Head from "next/head";

import Header from "../components/Header";

import "../styles/main.css";
import AddClassForm from "../components/AddClassForm";

import "../store";

const Home = () => (
  <main>
    <Head>
      <title>Gameplan – Design Wonderful Semesters</title>
      <link rel="shortcut icon" href="/favicon.png" />
    </Head>

    <Header />

    <div className="container">
      <AddClassForm />
    </div>

    <div className="flex justify-center">
      <div className="w-40 h-24 rounded p-2 bg-purple-500 shadow flex flex-col justify-between">
        <header>
          <h2 className="font-bold text-xs tracking-widest font-mono">
            ES_APPM 252-1
          </h2>
          <h1>Integral Calculus</h1>
        </header>

        <footer className="flex justify-between">
          <div className="text-sm meta relative">
            <span className="cursor-pointer">1 – FS</span>

            <div className="bg-black  absolute meta__tooltip text-white border border-gray-800 border-l-4 w-32 p-1 text-xs">
              <p>Difficulty: 1/5</p>
              <p>Quarter: Fall/Spring</p>
            </div>
          </div>

          <button className="text-xs p-1 bg-purple-600 hover:bg-purple-600 leading-none rounded cursor-pointer">
            Edit
          </button>
        </footer>
      </div>
    </div>
  </main>
);

export default Home;
