import React from "react";
import Link from "next/link";

const ErrorInfo = () => (
  <div className="container mb-10">
    <style>{`
      .error-bg {
        min-height: 420px;
        background: url(/error.png) no-repeat;
        background-size: 35%;
        background-position: center bottom;
      }
  `}</style>
    <div className="error-bg pb-10">
      <header className="mt-10">
        <h1 className="text-center text-5xl">
          Uh oh! Something went terribly wrong!
        </h1>
        <h2 className="text-center text-3xl">
          No worries.{" "}
          <Link href="/">
            <a>Make your own gameplan.</a>
          </Link>{" "}
        </h2>
      </header>
    </div>
  </div>
);

export default ErrorInfo;
