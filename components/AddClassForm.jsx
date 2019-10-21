import React, { useState } from "react";

const AddClassForm = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [prereq, setPrereq] = useState([]);
  const [difficulty, setDifficulty] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(code, name, prereq, difficulty);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex mb-4 bg-white text-black rounded"
    >
      <div className="w-1/3 pl-4 py-4 bg-right bg-no-repeat add-class-form__title">
        <h1 className="text-4xl mt-6">
          Add <br /> Classes
        </h1>
      </div>

      <div className="w-1/3 pl-4 py-4">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="form__label" htmlFor="class-number">
              Class Number
            </label>
            <input
              className="form__input"
              id="class-number"
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <p className="text-gray-600 text-xs italic">
              Example, ELEC_ENG 395
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <label className="form__label" htmlFor="class-name">
              Name
            </label>
            <input
              className="form__input"
              id="class-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="w-1/3 px-4 py-4">
        <div className="w-full mb-6">
          <label className="form__label" htmlFor="prereq">
            Prerequisties
          </label>
          <input className="form__input" id="prereq" type="text" />
          <p className="text-gray-600 text-xs italic">&nbsp;</p>
        </div>

        <div className="w-full">
          <label className="form__label">Difficulty (From 1 to 5)</label>

          <div className="flex">
            <input
              className="form__input"
              id="grid-password"
              type="number"
              min="1"
              max="5"
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
            />
            <input className="form__submit " type="submit" value="Add" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddClassForm;
