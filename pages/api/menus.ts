import { NextApiRequest, NextApiResponse } from "next";
import { data } from "./testdata";

export default function menusAPI(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ data });
}
