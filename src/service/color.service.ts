import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ColorModel, { ColorInput } from "../models/color.model";

export async function createColor(input: ColorInput) {
    try {
      const result = await ColorModel.create(input);
      return result;
    } catch (e:any) {
        throw new Error(e);
    }
  }