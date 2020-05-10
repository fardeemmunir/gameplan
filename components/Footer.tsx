import React from "react";

const Footer = () => (
  <footer className="text-gray-500 pb-8 pt-4 text-sm container flex flex-col justify-between">
    <p className="text-right tracking-tight">
      Build using <a href="https://d3js.org/">D3</a>,{" "}
      <a href="https://fauna.com/">Fauna DB</a>,{" "}
      <a href="https://tailwindcss.com/">Tailwind.css</a> and{" "}
      <a href="https://reactjs.org/">React</a> &amp;{" "}
      <a href="https://nextjs.org/">Friends</a>
    </p>
    <p className="text-right tracking-tight">
      Made by <a href="https://fardeem.com">Fardeem Munir</a>
    </p>
  </footer>
);

export default Footer;
