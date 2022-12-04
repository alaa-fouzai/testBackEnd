import { date, number, object, string, TypeOf } from "zod";


export const categorySchema = object({
  body: object({
    productId: string({
      required_error: "ProductId is required",
    }),
    categoryName: string({
        required_error: "category Name is required",
      }),
    })
});


export type categoryInput = TypeOf<typeof categorySchema>;