import React from "react";
import Link from "next/link";

const AboutCard = () => (
  <div className="mb-4 mt-8 bg-white text-black rounded">
    <div className="  mx-auto max-w-3xl p-4 flex items-center ">
      <style>{`
        .img {
          max-width: 14rem;
        }
      `}</style>
      <div>
        <h1>
          Gameplan let's you make sense of the prerequisite dependency between
          your classes and lets you craft a schedule to optimize for your
          interest and the difficulty of the class.
        </h1>
        <Link href="/">
          <a className="form__submit inline-block mt-4 mr-4">Build Your Own</a>
        </Link>
      </div>
      <img className="img" src="plan.png" />
    </div>
  </div>
);

export default AboutCard;
