import faunadb from "faunadb";
import randomstring from "randomstring";
import config from "../../config";

const secret = config.fauna_key;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

module.exports = async (req, res) => {
  try {
    const id = randomstring.generate({
      length: 12,
      charset: "alphabetic"
    });

    const query = await client.query(
      q.Create(q.Collection("plans"), {
        data: { id, classList: req.body.classList, schedule: req.body.schedule }
      })
    );
    // ok
    // @ts-ignore
    res.status(200).json({ id });
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
