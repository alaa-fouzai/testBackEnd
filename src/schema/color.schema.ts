import { date, number, object, string, TypeOf } from "zod";


export const colorSchema = object({
  body: object({
    ColorName: string({
      required_error: "Color name is required",
    }),
    productId: string({
        required_error: "productId is required",
      }),
    })
});


export type ColorInput = TypeOf<typeof colorSchema>;