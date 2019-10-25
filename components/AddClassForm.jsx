import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { colors } from "tailwindcss/defaultTheme";

const selectOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const multiSelectStyles = {
  control: provided => ({
    ...provided,
    backgroundColor: colors.gray[200],
    border: 0
  }),
  multiValue: provided => ({
    ...provided,
    backgroundColor: "transparent"
  })
};

const AddClassForm = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [prereq, setPrereq] = useState([]);
  const [difficulty, setDifficulty] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(code, name, prereq, difficulty);
    setCode("");
    setName("");
    setPrereq([]);
    setDifficulty(1);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex mb-4 bg-white text-black rounded"
    >
      <div className="w-1/5 pl-4 py-4 bg-right-bottom bg-no-repeat add-class-form__title">
        <h1 className="text-4xl mt-6">
          Add <br /> Classes
        </h1>
      </div>

      <div className="w-2/5 pl-4 py-4">
        <div className="flex flex-wrap">
          <div className="w-1/3 pr-3">
            <label className="form__label" htmlFor="class-number">
              Class ###
            </label>
            <input
              className="form__input"
              id="class-number"
              type="text"
              required
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <p className="text-gray-600 text-xs italic">Ex: ELEC_ENG 395</p>
          </div>

          <div className="w-2/3">
            <label className="form__label" htmlFor="class-name">
              Name
            </label>
            <input
              className="form__input"
              id="class-name"
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="w-full mt-5">
            <label className="form__label" htmlFor="prereq">
              Prerequisties
            </label>

            <CreatableSelect
              styles={multiSelectStyles}
              className="mb-3"
              isMulti
              onChange={selectedItems =>
                // @ts-ignore
                setPrereq((selectedItems || []).map(({ value }) => value))
              }
              options={selectOptions}
              placeholder=""
            />
          </div>
        </div>
      </div>

      <div className="w-2/5 px-4 py-4">
            <input
              className="form__input w-1/2"
              id="grid-password"
              type="number"
              min="1"
              max="5"
              required
              value={difficulty}
              onChange={e => setDifficulty(Number(e.target.value))}
            />
            <input className="form__submit w-3/4" type="submit" value="Add" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddClassForm;
