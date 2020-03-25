import React, { useState } from "react";
import Modal from "react-modal";

import CloseIcon from "./CloseIcon";

// const ShareModal = () => {
//   const { query } = useRouter();
//   const { classList, schedule } = useContext(Store);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sharingId, setSharingId] = useState("");

//   async function getId() {
//     setIsLoading(true);

//     setSharingId("123");
//     setIsLoading(false);
//     // if (query.id && typeof query.id === "string") {
//     //   setSharingId(query.id);
//     //   setIsLoading(false);
//     //   return;
//     // }

//     // if (classList.length === 0) {
//     //   setSharingId(null);
//     //   setIsLoading(false);
//     //   return;
//     // }

//     // fetch("/api/createClassList", {
//     //   method: "POST",
//     //   headers: {
//     //     Accept: "application/json",
//     //     "Content-Type": "application/json"
//     //   },
//     //   body: JSON.stringify({ classList, schedule })
//     // })
//     //   .then(res => res.json())
//     //   .then(content => {
//     //     setSharingId(content.id);
//     //     setIsLoading(false);
//     //   });

//     // return;
//   }

//   useEffect(() => {
//     function closeModal() {
//       if (isModalOpen) setIsModalOpen(false);
//     }

//     function stopPropagation(e) {
//       e.stopPropagation();
//     }

//     document.addEventListener("click", closeModal);
//     document
//       .querySelector("#share-modal")
//       .addEventListener("click", stopPropagation);

//     return () => {
//       document.removeEventListener("click", closeModal);
//       document
//         .querySelector("#share-modal")
//         .removeEventListener("click", stopPropagation);
//     };
//   }, [isModalOpen]);

//   return (
//     <div className="relative">
//       <button
//         className="block p-2 bg-blue-600 rounded form__submit mb-0"
//         onClick={() => {
//           getId();
//           setIsModalOpen(!isModalOpen);
//         }}
//       >
//         Share
//       </button>

//       <style jsx>{`
//         .modal--closed {
//           z-index: -2;
//         }
//       `}</style>

//       <div
//         id="share-modal"
//         className={
//           "absolute bg-white p-2 share-modal rounded w-64 text-black text-left " +
//           (isModalOpen ? "opacity-100 z-10" : "opacity-0 modal--closed")
//         }
//       >
//         {classList.length === 0 ? (
//           <p className="p-2 text-sm font-italic text-gray-700">
//             Add some classes before you share!
//           </p>
//         ) : isLoading ? (
//           <Loader />
//         ) : (
//           <ShareInfo id={sharingId} />
//         )}
//       </div>
//     </div>
//   );
// };

const ShareInfo = ({ id }) => (
  <div>
    <div className="flex">
      <input
        id="sharing-id"
        type="text"
        readOnly
        value={window.location.origin + "/" + id}
        className="w-full bg-gray-200 px-2 py-1 rounded mb-2"
      />
    </div>
  </div>
);

export default () => {
  const [open, setOpen] = useState(false);

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
        <ShareInfo id="111" />
        <div className="w-full flex justify-between">
          <p className="italic text-gray-800 text-sm">Link copied!</p>

          <button
            className="focus:outline-none text-sm text-gray-800 flex"
            onClick={() => setOpen(false)}
          >
            <span className="mr-1">Close</span> <CloseIcon color="#283748" />
          </button>
        </div>
      </Modal>
    </div>
  );
};
