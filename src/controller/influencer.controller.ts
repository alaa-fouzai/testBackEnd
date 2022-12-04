import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../schema/influencer.schema";
import { createUser } from "../service/influencer.service";

export async function createUserHandler(
  req: Request<{},{},CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
}