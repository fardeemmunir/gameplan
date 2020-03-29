import React from "react";
import Head from "next/head";
import Link from "next/link";

const Header = () => (
  <header className="pt-8 mb-8 text-white">
    <Head>
      <title>Gameplan – Design Wonderful Semesters</title>
      <link rel="shortcut icon" href="/favicon.png" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Quicksand:400,700&display=swap"
      />
    </Head>
    <div className="flex justify-between items-center">
      <h1 className="uppercase text-xl tracking-widest">
        <Link href="/">
          <a className="text-white">Gameplan</a>
        </Link>
      </h1>
      <h2 className="text-gray-300 text-xs italic opacity-75">
        Design Wonderful Semesters
      </h2>
    </div>
  </header>
);

export default Header;
