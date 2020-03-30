import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import CreatableSelect from "react-select/creatable";
import { Styles } from "react-select";
import { colors } from "tailwindcss/defaultTheme";

import { useStore } from "../lib/store";
import { addOrUpdateClass, removeClass } from "../lib/reducer";

const multiSelectStyles: Styles = {
  control: (provided, { isFocused }) => ({
    ...provided,
    borderRadius: "0.25rem",
    backgroundColor: "transparent",
    borderColor: isFocused ? colors.gray[500] : colors.gray[300],
    boxShadow: "none"
  }),

  multiValue: provided => ({
    ...provided,
    backgroundColor: colors.gray[200]
  }),

  valueContainer: provided => ({
    ...provided,
    paddingLeft: "8",
    borderRadius: "0.25em"
  })
};

const emptyClass = {
  id: "",
  code: "",
  name: "",
  prereqs: [],
  difficulty: 1,
  interest: 1,
  quarterPref: []
};

const ClassForm = () => {
  const { classList, editClass, dispatch } = useStore();
  const [initialValue, setInitialValue] = useState(emptyClass);

  useEffect(() => {
    if (editClass === "") {
      setInitialValue(emptyClass);
    } else {
      setInitialValue(classList.find(({ id }) => id === editClass));
    }
  }, [editClass]);

  function classesDependedOn(parentClassId: string) {
    return classList
      .filter(({ prereqs }) => prereqs.includes(parentClassId))
      .map(({ code }) => code);
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValue}
      onSubmit={(values, { resetForm }) => {
        dispatch(addOrUpdateClass(values));
        resetForm();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="w-full flex">
          <div className="w-1/2 mr-4">
            <section className="flex mb-4">
              <div className="w-1/3 mr-2">
                <label className="form__label" htmlFor="code">
                  Class ID.
                </label>
                <Field name="code" type="text" className="form__input" />
                <p className="text-gray-600 text-xs italic">Ex: ELEC_ENG 302</p>
              </div>

              <div className="w-2/3 ml-2">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <Field className="form__input" name="name" type="text" />
                <p className="text-gray-600 text-xs italic">
                  Ex: Probabilistic Systems
                </p>
              </div>
            </section>

            <section className="w-full">
              <label className="form__label">Prerequisties</label>

              <CreatableSelect
                styles={multiSelectStyles}
                className="mb-3"
                isMulti
                options={classList.map(({ id, code }) => ({
                  value: id,
                  label: code
                }))}
                value={values.prereqs.map(id => ({
                  label: classList.find(classInfo => classInfo.id === id).code,
                  value: id
                }))}
                onChange={selectedItems =>
                  setFieldValue(
                    "prereqs",
                    // @ts-ignore
                    (selectedItems || []).map(({ value }) => value)
                  )
                }
              />
            </section>
          </div>

          <div className="w-1/2 flex flex-wrap">
            {["difficulty", "interest"].map(section => (
              <section key={section} className="w-1/4 pr-4">
                <label className="form__label">{section}</label>

                <Field
                  name={section}
                  className="form__input"
                  type="number"
                  min="1"
                  max="5"
                ></Field>
                <p className="text-gray-600 text-xs italic">Between 1-5 </p>
              </section>
            ))}

            <section className="w-1/2">
              <label htmlFor="difficulty" className="form__label">
                Quarter
              </label>
              <FieldArray
                name="quarterPref"
                render={arrayHelpers => (
                  <div className="flex justify-between mb-3 quarter-selector">
                    {["FALL", "WINTER", "SPRING"].map(quarter => (
                      <button
                        type="button"
                        key={quarter}
                        className={
                          values.quarterPref.includes(quarter)
                            ? "bg-gray-200"
                            : ""
                        }
                        onClick={() => {
                          const index = values.quarterPref.findIndex(
                            pref => pref === quarter
                          );

                          return index === -1
                            ? arrayHelpers.push(quarter)
                            : arrayHelpers.remove(index);
                        }}
                      >
                        {quarter.toLowerCase()}
                      </button>
                    ))}
                  </div>
                )}
              />
              <p className="text-gray-600  text-xs italic">
                For teacher preference{" "}
              </p>
            </section>

            <style jsx>{`
              .form-btn {
                padding-right: 1rem;
                margin-top: 3px;
                transition: all 0.1s;
              }

              .form-btn:last-of-type {
                padding-right: 0;
              }
            `}</style>

            <section className="flex-1 pr-4 form-btn">
              <label className="form__label">&nbsp;</label>
              <input
                className="form__submit w-full align mr-4"
                type="submit"
                value={`${editClass ? "Update" : "Add"} Class`}
              />
            </section>

            {editClass !== "" && (
              <section className="w-1/2 form-btn">
                <label className="form__label">&nbsp;</label>
                <button
                  className="form__submit--danger w-full align"
                  onClick={() => dispatch(removeClass(editClass))}
                  {...(() => {
                    const dependedBy = classesDependedOn(values.id);

                    if (dependedBy.length === 0) return {};

                    return {
                      disabled: true,
                      "data-tooltip": `Class cannot be removed because it is depended on by ${dependedBy.join(
                        ", "
                      )}.`
                    };
                  })()}
                >
                  Remove class
                </button>
              </section>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default () => {
  const { editClass } = useStore();

  return (
    <div className="flex mb-4 bg-white text-black rounded">
      <style jsx>{`
        .bg {
          background-image: url("/books.png");
          background-size: 80%;
          background-position: right bottom;
          background-repeat: no-repeat;
        }
      `}</style>
      <div className="w-1/5 pl-4 flex items-center bg">
        <h1 className="text-4xl">
          {editClass ? "Edit" : "Add"} <br /> Class
        </h1>
      </div>

      <div className="w-4/5 p-4">
        <ClassForm />
      </div>
    </div>
  );
};
