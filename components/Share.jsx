import React, { useState } from "react";

const Share = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="relative">
      <button
        className="block p-2 bg-blue-600 rounded form__submit mb-0"
        onClick={() => setOpenModal(!openModal)}
      >
        Share
      </button>

      <div
        className={
          "absolute bg-white p-2 share-modal rounded w-64 text-black text-left " +
          (openModal ? "opacity-100" : "opacity-0")
        }
      >
        <div className="flex">
          <input
            type="text"
            value="localhost:3000/sHjwKlQ"
            disabled
            className="w-full bg-gray-300 px-2 py-1 rounded-tl rounded-bl mb-2"
          />

          <svg
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            fill="#eee"
            className="bg-gray-300 rounded-tr rounded-br cursor-pointer share-modal--icon"
            style={{
              width: "30px",
              height: "32px"
            }}
          >
            <g>
              <path d="M73.91,21H36.09C33.28,21,31,23.28,31,26.09V31h-4.91C23.28,31,21,33.28,21,36.09v37.82c0,2.81,2.28,5.09,5.09,5.09h37.82   c2.81,0,5.09-2.28,5.09-5.09V69h4.91c2.81,0,5.09-2.28,5.09-5.09V26.09C79,23.28,76.72,21,73.91,21z M65,73.91   c0,0.6-0.49,1.09-1.09,1.09H26.09c-0.6,0-1.09-0.49-1.09-1.09V36.09c0-0.6,0.49-1.09,1.09-1.09h37.82c0.6,0,1.09,0.49,1.09,1.09   V73.91z M75,63.91c0,0.6-0.49,1.09-1.09,1.09H69V36.09c0-2.81-2.28-5.09-5.09-5.09H35v-4.91c0-0.6,0.49-1.09,1.09-1.09h37.82   c0.6,0,1.09,0.49,1.09,1.09V63.91z" />
            </g>
          </svg>
        </div>
        <p className="italic text-gray-800 text-sm">Link copied!</p>
      </div>
    </div>
  );
};

export default Share;
