import React, { useContext } from "react";
import Store from "../lib/store";
import { setClassToEdit } from "../lib/reducer";

const ListView = ({ classList }) => {
  const { dispatch } = useContext(Store);

  const propNames = [
    "code",
    "name",
    "prereqs",
    "difficulty",
    "interest",
    "quarterPref"
  ];

  function mapPropNameToLabel(prop) {
    if (prop === "prereqs") return "prerequisites";
    if (prop === "quarterPref") return "quarter pref.";

    return prop;
  }

  return (
    <div className="container mx-auto mb-12">
      <table className="table-auto w-full">
        <thead className="text-left font-bold">
          <tr>
            {propNames.map(mapPropNameToLabel).map((prop, i) => (
              <th
                key={i}
                className="px-4 py-2 uppercase text-xs tracking-widest"
              >
                {prop}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="border-b border-gray-600 text-sm text-gray-300">
          <style jsx>{`
            td:first-of-type {
              min-width: 10rem;
            }
          `}</style>
          {classList.map(classInfo => (
            <tr key={classInfo.id}>
              {propNames.map(prop => (
                <td
                  key={prop}
                  className="border-t border-gray-600 capitalize px-4 py-2"
                >
                  {classInfo[prop]}
                </td>
              ))}
              <td className="border-t border-gray-600 pl-4 py-2">
                <button
                  className="form__submit"
                  onClick={() => {
                    dispatch(setClassToEdit(classInfo.id));
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
