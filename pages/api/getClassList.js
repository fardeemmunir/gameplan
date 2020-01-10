import faunadb from "faunadb";
import config from "../../config";

const secret = config.fauna_key;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

module.exports = async (req, res) => {
  try {
    const query = await client.query(
      q.Get(q.Ref(q.Collection("plans"), req.query.id))
    );
    // ok
    // @ts-ignore
    res.status(200).json(query.data);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
