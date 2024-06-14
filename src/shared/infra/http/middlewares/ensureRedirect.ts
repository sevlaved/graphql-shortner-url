import { NextFunction, Request, Response } from "express";
import { Mongodb } from "../../database/mongoDb";
import { ClicksCommands } from "../../../../modules/clicks/commands";

export const ensureRedirect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const db = await Mongodb.getDb();
  const command = new ClicksCommands(db);

  const ua = req.headers["user-agent"] as string;
  let ip =
    (req.headers["x-forwarded-for"] as string) ||
    (req.connection.remoteAddress as string);
  const { tracker } = req.params;

  const result = await command.redirect({ tracker, ua, ip });

  return res.redirect(result);
};
