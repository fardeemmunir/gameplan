import React from "react";
import Head from "next/head";

import Header from "../components/Header";

import "../styles/main.css";

import { StoreProvider } from "../lib/store";
import Graph from "../components/graph";
import Schedule from "../components/Schedule";
import ClassDetails from "../components/ClassDetails";
import Footer from "../components/Footer";
import Link from "next/link";

const Page = () => {
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
          <div className="mb-4 mt-8 text-black ">
            <div className="bg-white rounded mx-auto max-w-xl p-4 flex items-center ">
              <style>{`
                .img {
                  max-width: 14rem;
                }
              `}</style>
              <div>
                <h1>
                  Gameplan let's you make sense of the prerequisite dependency
                  between your classes and lets you craft a schedule to optimize
                  for your interest and the difficulty of the class.
                </h1>
                <Link href="/">
                  <a className="form__submit inline-block mt-4">
                    Build Your Own
                  </a>
                </Link>
              </div>
              <img className="img" src="plan.png" />
            </div>
          </div>
        </div>

        <ClassDetails />
        <Graph />
        <Schedule />

        <Footer />
      </main>
    </StoreProvider>
  );
};

export default Page;
