import React, { useState, useEffect } from "react";

const Share = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    function bubbled() {
      if (isModalOpen) setIsModalOpen(false);
    }

    function stop(e) {
      e.stopPropagation();
    }

    document.addEventListener("click", bubbled);
    document.querySelector("#share-modal").addEventListener("click", stop);

    return () => {
      document.removeEventListener("click", bubbled);
      document.querySelector("#share-modal").removeEventListener("click", stop);
    };
  }, [isModalOpen]);

  return (
    <div className="relative">
      <button
        className="block p-2 bg-blue-600 rounded form__submit mb-0"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Share
      </button>

      <style jsx>{`
        .modal--closed {
          z-index: -2;
        }
      `}</style>

      <div
        id="share-modal"
        className={
          "absolute bg-white p-2 share-modal rounded w-64 text-black text-left " +
          (isModalOpen ? "opacity-100 z-10" : "opacity-0 modal--closed")
        }
      >
        <div className="flex">
          <input
            type="text"
            value="localhost:3000/sHjwKlQ"
            disabled
            className="w-full bg-gray-200 px-2 py-1 rounded-tl rounded-bl mb-2"
          />

          <svg
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            fill="#eee"
            className="bg-gray-200 rounded-tr rounded-br pr-2"
            style={{
              width: "30px",
              height: "32px",
              fill: "rgba(0, 0, 0, 0.5)"
            }}
          >
            <g transform="translate(0,-952.36218)">
              <path d="m 42.22163,1035.596 c -7.014584,7.0145 -18.441189,7.0147 -25.455624,2e-4 -7.0145057,-7.0145 -7.014392,-18.4411 1.91e-4,-25.4556 l 14.142128,-14.14218 c 7.01457,-7.01457 18.441172,-7.01468 25.455645,-2.1e-4 a 3.00025,3.0003 45 1 1 -4.242637,4.24269 c -4.737479,-4.73752 -12.232896,-4.73746 -16.970439,10e-5 l -14.142144,14.1421 c -4.737521,4.7376 -4.737577,12.233 -1.01e-4,16.9705 4.737473,4.7374 12.232845,4.7373 16.970443,-10e-5 l 13.434994,-13.4351 a 3.00025,3.0003 45 1 1 4.242588,4.2426 l -13.435044,13.435 z m 26.870064,-26.8701 c -7.014585,7.0146 -18.441188,7.0147 -25.455625,3e-4 a 3.00025,3.0003 45 1 1 4.242645,-4.2427 c 4.737472,4.7375 12.232869,4.7374 16.970391,-2e-4 l 14.142169,-14.14204 c 4.737528,-4.73757 4.7376,-12.23297 1.26e-4,-16.97044 -4.73749,-4.7375 -12.232907,-4.73744 -16.970451,1.1e-4 l -13.435028,13.43503 a 3.00025,3.0003 45 1 1 -4.242571,-4.24258 l 13.435028,-13.43503 c 7.014569,-7.01457 18.441175,-7.01466 25.455658,-1.8e-4 7.014431,7.01443 7.014355,18.44105 -2.13e-4,25.45564 l -14.142129,14.14209 z" />
            </g>
          </svg>
        </div>
        <p className="italic text-gray-800 text-sm">Link copied!</p>
      </div>
    </div>
  );
};

export default Share;
