import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const { error } = await supabase
    .from("waitlist")
    .insert([{ email }]);

  if (error) {
    if (error.code === "23505") {
      // Postgres duplicate key error
      return res.status(409).json({
        message: "This email is already on the wait-list ",
      });
    }

    return res.status(500).json({
      message: "Something went wrong. Try again.",
    });
  }

  return res.status(200).json({
    message: "You’ve joined the StarkVault wait-list ",
  });
}
