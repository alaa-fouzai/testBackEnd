import { Request, Response } from "express";
import { ConversionsInput } from "../schema/conversions.schema";
import {
  createconversion, getGlobalPerformanceConversion,
} from "../service/conversion.service";

export async function createProductHandler(
  req: Request<{}, {}, ConversionsInput["body"]>,
  res: Response
) {

  const body = req.body;
  console.log(req.body);

  const product = await createconversion({ ...body });

  return res.send(product);
}

export async function GlobalPerformanceConversion(
  req: Request,
  res: Response
) {
  const body = req.body;
  console.log(req.body);
  try {
    const product = await getGlobalPerformanceConversion(req.body.start,req.body.finish);
    return res.send(product);
  } catch(e) {
  return res.sendStatus(404);
  }
  
}