const db = {
  1234: {
    editClass: "",
    classList: [
      {
        code: "ES_APPM 252-1",
        name: "Multivariable Differential Calculus",
        quarterPref: ["FALL"],
        interest: 1,
        difficulty: 3,
        prereqs: []
      },
      {
        code: "ES_APPM 252-2",
        name: "Multivariable Integral Calculus",
        quarterPref: ["WINTER"],
        difficulty: 4,
        interest: 1,
        prereqs: ["ES_APPM 252-1"]
      },
      {
        code: "COMP_SCI 111",
        name: "Intro to Programming",
        quarterPref: ["FALL"],
        difficulty: 1,
        interest: 1,
        prereqs: ["ES_APPM 252-1"]
      }
    ],
    schedule: {}
  }
};

export default (req, res) => {
  const queryResult = db[req.query.id];

  res.setHeader("Content-Type", "application/json");
  if (queryResult !== undefined) {
    res.status(200).json(queryResult);
  } else {
    res.status(500).json({ error: "Error!" });
  }
};
