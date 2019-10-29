import React, { useState, useEffect, useContext } from "react";
import CreatableSelect from "react-select/creatable";
import { colors } from "tailwindcss/defaultTheme";
import Store from "../lib/store";

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
  const [prereqs, setPrereqs] = useState([]);
  const [difficulty, setDifficulty] = useState(1);
  const [quarterPref, setQuarterPref] = useState([]);
  const [isEditingClass, setIsEditingClass] = useState(false);

  const { classList, editClass, dispatch } = useContext(Store);

  useEffect(() => {
    if (editClass.trim() === "") {
      setIsEditingClass(false);
      return clearForm();
    }

    const selectedClass = classList.find(({ code }) => code === editClass);
    setCode(selectedClass.code);
    setName(selectedClass.name);
    setPrereqs(selectedClass.prereqs);
    setDifficulty(selectedClass.difficulty);
    setQuarterPref(selectedClass.quarterPref);
    setIsEditingClass(true);
  }, [editClass]);

  function clearForm() {
    setCode("");
    setName("");
    setPrereqs([]);
    setDifficulty(1);
    setQuarterPref([]);
    setIsEditingClass(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch({
      type: "ADD_CLASS",
      payload: { code, name, prereqs, difficulty, quarterPref }
    });
    dispatch({
      type: "FINISH_EDITING_CLASS"
    });
    clearForm();
  }

  function handleQuarterPrefChange(e) {
    const selection = e.target.name;

    if (quarterPref.includes(selection)) {
      return setQuarterPref(
        quarterPref.filter(quarters => quarters !== selection)
      );
    } else {
      return setQuarterPref(quarterPref.concat(selection));
    }
  }

  const prereqOptions = classList.map(({ code }) => ({
    label: code,
    value: code
  }));

  return (
    <form
      onSubmit={handleSubmit}
      className="flex mb-4 bg-white text-black rounded"
    >
      <div className="w-1/5 pl-4 py-4 bg-right-bottom bg-no-repeat add-class-form__title">
        <h1 className="text-4xl mt-6">
          {isEditingClass ? "Edit" : "Add"} <br /> Class
        </h1>
      </div>

      <div className="w-2/5 pl-4 py-4">
        <div className="flex flex-wrap">
          <div className="w-1/3 pr-3">
            <label className="form__label" htmlFor="class-number">
              Class ###
            </label>
            <input
              className={"form__input " + (isEditingClass && "opacity-75")}
              id="class-number"
              type="text"
              required
              value={code}
              onChange={e => setCode(e.target.value)}
              disabled={isEditingClass}
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
            <label className="form__label">Prerequisties</label>

            <CreatableSelect
              styles={multiSelectStyles}
              className="mb-3"
              isMulti
              options={prereqOptions}
              placeholder=""
              value={prereqs.map(code => ({
                value: code,
                label: code
              }))}
              onChange={selectedItems =>
                // @ts-ignore
                setPrereqs((selectedItems || []).map(({ value }) => value))
              }
            />
          </div>
        </div>
      </div>

      <div className="w-2/5 px-4 py-4">
        <div className="flex flex-wrap">
          <div className="w-1/2">
            <label className="form__label">Difficulty</label>
            <input
              className="form__input"
              id="grid-password"
              type="number"
              min="1"
              max="5"
              required
              value={difficulty}
              onChange={e => setDifficulty(Number(e.target.value))}
            />
            <p className="text-gray-600 text-xs italic">Between 1-5 </p>
          </div>

          <div className="w-1/2 pl-3">
            <label className="form__label">Quarter</label>

            <div className="flex justify-between quarter-selector mb-2">
              {["FALL", "WINTER", "SPRING"].map(quarter => (
                <div key={quarter}>
                  <input
                    type="checkbox"
                    className="hidden"
                    id={"QUARTER-" + quarter}
                    name={quarter}
                    onChange={handleQuarterPrefChange}
                    checked={quarterPref.includes(quarter)}
                  />
                  <label
                    className="block p-2 rounded border-2 border-gray-200 leading-tight cursor-pointer capitalize select-none"
                    htmlFor={"QUARTER-" + quarter}
                  >
                    {quarter.toLowerCase()}
                  </label>
                </div>
              ))}
            </div>

            <p className="text-gray-600 text-xs italic">
              For teacher preference{" "}
            </p>
          </div>

          <div className={"mt-5 " + (isEditingClass ? "w-1/2" : "w-full")}>
            <label className="form__label">&nbsp;</label>
            <input
              className="form__submit w-full"
              type="submit"
              value={isEditingClass ? "Update Class" : "Add Class"}
            />
          </div>
          {isEditingClass && (
            <div className="w-1/2 pl-3 mt-5">
              <label className="form__label">&nbsp;</label>
              <input
                className="w-full form__submit--danger"
                type="button"
                value="Remove Class"
                onClick={() => {
                  dispatch({
                    type: "REMOVE_CLASS",
                    payload: {
                      classCode: code
                    }
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default AddClassForm;
