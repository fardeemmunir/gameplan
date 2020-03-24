import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import Store from "../lib/store";
import Loader from "./Loader";

const ShareModal = () => {
  const { query } = useRouter();
  const { classList, schedule } = useContext(Store);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sharingId, setSharingId] = useState();

  function getId() {
    setIsLoading(true);

    if (query.id) {
      setSharingId(query.id);
      setIsLoading(false);
      return;
    }

    if (classList.length === 0) {
      setSharingId("error");
      setIsLoading(false);
      return;
    }

    fetch("/api/createClassList", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ classList, schedule })
    })
      .then(res => res.json())
      .then(content => {
        setSharingId(content.id);
        setIsLoading(false);
      });

    return;
  }

  useEffect(() => {
    if (!isModalOpen) return;

    // @ts-ignore
    const sharingModal = document.querySelector("#sharing-id");

    if (sharingModal) {
      // @ts-ignore
      sharingModal.select();
      document.execCommand("copy");
    }
  }, [isModalOpen]);

  useEffect(() => {
    function closeModal() {
      if (isModalOpen) setIsModalOpen(false);
    }

    function stopPropagation(e) {
      e.stopPropagation();
    }

    document.addEventListener("click", closeModal);
    document
      .querySelector("#share-modal")
      .addEventListener("click", stopPropagation);

    return () => {
      document.removeEventListener("click", closeModal);
      document
        .querySelector("#share-modal")
        .removeEventListener("click", stopPropagation);
    };
  }, [isModalOpen]);

  return (
    <div className="relative">
      <button
        className="block p-2 bg-blue-600 rounded form__submit mb-0"
        onClick={() => {
          getId();
          setIsModalOpen(!isModalOpen);
        }}
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
        {isLoading ? <Loader /> : <ShareInfo id={sharingId} />}
      </div>
    </div>
  );
};

const ShareInfo = ({ id }) => (
  <div>
    {id === "error" ? (
      <p className="p-2 text-sm font-italic text-gray-700">
        Add some classes before you share!
      </p>
    ) : (
      <>
        <div className="flex">
          <input
            id="sharing-id"
            type="text"
            readOnly
            value={window.location.origin + "/" + id}
            className="w-full bg-gray-200 px-2 py-1 rounded mb-2"
          />
        </div>
        <p className="italic text-gray-800 text-sm">Link copied!</p>
      </>
    )}
  </div>
);

export default ShareModal;
