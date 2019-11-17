import React from "react";
import Head from "next/head";

import Header from "../components/Header";

import "../styles/main.css";
import AddClassForm from "../components/AddClassForm";

import { StoreProvider } from "../lib/store";
import Graph from "../components/graph";
import Schedule from "../components/Schedule";
import ClassDetails from "../components/ClassDetails";

const Home = () => {
  return (
    <StoreProvider>
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

        <footer className="text-gray-500 pb-8 pt-4 text-sm container flex justify-between">
          <p className="text-right tracking-tight">
            Build using <a href="https://d3js.org/">D3</a>,{" "}
            <a href="https://tailwindcss.com/">Tailwind.css</a> and{" "}
            <a href="https://reactjs.org/">React</a> &amp;{" "}
            <a href="https://nextjs.org/">Friends</a>
          </p>
          <p className="text-right tracking-tight">Made by Fardeem Munir</p>
        </footer>
      </main>
    </StoreProvider>
  );
};

export default Home;
