import { date, number, object, string, TypeOf } from "zod";
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateConversionInput:
 *      type: object
 *      required:
 *        - name
 *        - quantity
 *        - device
 *        - product
 *      properties:
 *        name:
 *          type: string
 *          default: conversion 8
 *        quantity:
 *          type: number
 *          default: 5
 *        device:
 *          type: string
 *          default: android
 *        product:
 *          type: object
 *          required:
 *            - sellerid
 *          properties:
 *            sellerid:
 *              type: string
 *              default: 638bac7f65685546fa467a12
 *            productId:
 *              type: string
 *              default: qsdqsdqsdqsdqff
 *            name:
 *              type: string
 *              default: jeans
 *            price:
 *              type: number
 *              default: 15
 *            image:
 *              type: string
 *              default: myimage.png
 *            country:
 *              type: string
 *              default: tunisia
 *    CreateConversionResponse:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        device:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        product:
 *          type: object
 *          properties:
 *            sellerid:
 *              type: string
 *            productId:
 *              type: string
 *            name:
 *              type: string
 *            price:
 *              type: number
 *            image:
 *              type: string
 *            country:
 *              type: string
 */

export const conversionsSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    quantity: number({
        required_error: "sellerid is required",
      }),
    device: string({
        required_error: "device is required",
      }),
    product: object({
        sellerid: string({
            required_error: "sellerid is required",
          }),
        productId: string({
            required_error: "productId is required",
        }),
        name: string({
            required_error: "name is required",
          }),
        price: number({
            required_error: "Price is required",
          }),
        image: string({
            required_error: "image is required",
          }),
        country:string({
            required_error: "country is required",
          }),
      })
    })
});


export type ConversionsInput = TypeOf<typeof conversionsSchema>;