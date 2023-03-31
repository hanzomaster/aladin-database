import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env/server.mjs";

const example = async (req: NextApiRequest, res: NextApiResponse) => {
  const test = env.ADMIN_EMAILS.split(",");
  res.json(test);
};
export default example;
