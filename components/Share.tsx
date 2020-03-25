import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import isEqual from "lodash/isEqual";
import { useRouter } from "next/router";

import CloseIcon from "./CloseIcon";
import { useStore } from "../lib/store";
import Loader from "./Loader";

const useSharingId = (isOpen: boolean) => {
  const { classList, schedule } = useStore();
  const { query } = useRouter();
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const prevData = useRef({});

  useEffect(() => {
    if (!isOpen) return;

    if (query.id && typeof query.id === "string") {
      setId(query.id);
      setLoading(false);
      return;
    }

    const dataToSave = { classList, schedule };

    if (isEqual(dataToSave, prevData.current)) return;

    async function saveDataUpdatId() {
      setLoading(true);

      const data = await fetch("/api/share", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ classList, schedule })
      }).then(res => res.json());

      setId(data.id);
      setLoading(false);
      prevData.current = dataToSave;
    }

    saveDataUpdatId();
  }, [classList, schedule, isOpen]);

  return { id, loading };
};

const SharingInfo = ({ id, close }) => {
  useEffect(() => {
    const sharingModal: HTMLInputElement = document.querySelector(
      "#sharing-id-input"
    );

    if (sharingModal) {
      sharingModal.select();
      document.execCommand("copy");
    }
  }, []);

  return (
    <div>
      <div className="flex">
        <input
          id="sharing-id-input"
          type="text"
          readOnly
          value={window.location.origin + "/" + id}
          className="w-full bg-gray-200 px-2 py-1 rounded mb-2 focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="w-full flex justify-between">
        <p className="italic text-gray-800 text-sm">Link copied!</p>

        <button
          className="focus:outline-none text-sm text-gray-800 flex"
          onClick={close}
        >
          <span className="mr-1">Close</span> <CloseIcon color="#283748" />
        </button>
      </div>
    </div>
  );
};

export default () => {
  const [open, setOpen] = useState(false);
  const { id, loading } = useSharingId(open);

  return (
    <div id="sharing-modal">
      <button
        className="block p-2 bg-blue-600 rounded form__submit mb-0"
        onClick={() => setOpen(!open)}
      >
        Share
      </button>

      <Modal
        isOpen={open}
        ariaHideApp={false}
        parentSelector={() => document.querySelector("#sharing-modal")}
        onRequestClose={() => setOpen(false)}
        className="absolute bg-white z-10 p-2 share-modal rounded w-64 text-black text-left outline-none"
        closeTimeoutMS={200}
        style={{
          overlay: {
            position: "relative",
            backgroundColor: "transparent"
          },
          content: {}
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <SharingInfo id={id} close={() => setOpen(false)} />
        )}
      </Modal>
    </div>
  );
};
