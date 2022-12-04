import { Request, Response } from "express";
import { ColorInput } from "../schema/color.schema";
import {
  createColor
} from "../service/color.service";

export async function createColorHandler(
  req: Request<{}, {}, ColorInput["body"]>,
  res: Response
) {

  const body = req.body;
  console.log(req.body);

  const color = await createColor({ ...body });

  return res.send(color);
}
/*
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
  
}*/