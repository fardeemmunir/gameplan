import React from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { resetServerContext } from "react-beautiful-dnd";

import Header from "../components/Header";

import "../styles/main.css";

import { StoreProvider } from "../lib/store";
import AboutCard from "../components/AboutCard";
import ErrorInfo from "../components/ErrorInfo";
import Graph from "../components/Graph";
import Schedule from "../components/Schedule";
import ClassDetails from "../components/ClassDetails";
import Footer from "../components/Footer";

const Page = ({ stateFromServer, isError }) => {
  return (
    <StoreProvider stateFromServer={stateFromServer}>
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
          {!isError && <AboutCard />}
        </div>

        {isError ? (
          <ErrorInfo />
        ) : (
          <>
            <ClassDetails />
            <Graph />
            <Schedule />
          </>
        )}

        <Footer />
      </main>
    </StoreProvider>
  );
};

Page.getInitialProps = async ({ query, req }) => {
  resetServerContext();

  const url =
    req && req.headers && req.headers.host
      ? "http://" + req.headers.host
      : window.location.origin;

  const res = await fetch(`${url}/api/getClassList?id=${query.id}`);
  const info = await res.json();

  return {
    stateFromServer: info,
    isError: res.status === 500 ? true : false
  };
};

export default Page;
