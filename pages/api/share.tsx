import { NextApiRequest, NextApiResponse } from "next";
import randomstring from "randomstring";
import faunadb from "faunadb";
import fetch from "isomorphic-unfetch";

import { Class, ScheduleWithLocks } from "../../lib/reducer";
import config from "../../config";

const secret = config.fauna_key;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

type ResponseData = {
  id: string;
  classList: Class[];
  schedule: ScheduleWithLocks;
};

type ResponseId = {
  id: string;
};

type ResponseError = {
  error: string;
};

async function createRecord(classList: Class[], schedule: ScheduleWithLocks) {
  const id = randomstring.generate({
    length: 12,
    charset: "alphabetic"
  });

  await client.query(
    q.Create(q.Collection("plans"), {
      data: { id, classList: classList, schedule: schedule }
    })
  );

  return id;
}

async function retriveRecord(id: string) {
  const query = await client.query(q.Get(q.Match(q.Index("plans_by_id"), id)));

  // @ts-ignore
  return query.data;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseId | ResponseError>
) => {
  switch (req.method) {
    case "GET": {
      if (typeof req.query.id !== "string")
        throw new Error("An ID must be specified as a query param");

      try {
        const data: ResponseData = await retriveRecord(req.query.id);
        res.status(200).json(data);
      } catch (e) {
        res.status(500).json({ error: e.message });
      }

      break;
    }
    case "POST": {
      try {
        const id = await createRecord(req.body.classList, req.body.schedule);
        res.status(200).json({ id });
      } catch (e) {
        res.status(500).json({ error: e.message });
      }

      break;
    }
    default: {
      throw new Error("HTTP verb not supported");
    }
  }
};
