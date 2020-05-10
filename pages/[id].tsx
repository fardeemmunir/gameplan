import React from "react";
import { GetServerSideProps } from "next";
import fetch from "isomorphic-unfetch";
import { resetServerContext } from "react-beautiful-dnd";

import "../styles/main.css";
import { StoreProvider } from "../lib/store";

import Header from "../components/Header";
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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  resetServerContext();

  const url =
    req && req.headers && req.headers.host
      ? "http://" + req.headers.host
      : window.location.origin;

  const res = await fetch(`${url}/api/share?id=${query.id}`);
  const data = await res.json();

  return {
    props: {
      stateFromServer: data,
      isError: res.status === 500 ? true : false,
    },
  };
};

export default Page;
