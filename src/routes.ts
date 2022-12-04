import { Express, Request, Response } from "express";
import { createCategoryHandler, GlobalInsight } from "./controller/category.controller";
import { createColorHandler } from "./controller/color.controller";
import { createProductHandler, GlobalPerformanceConversion } from "./controller/conversion.controller";
import { createUserHandler } from "./controller/influencer.controller";
import validateResource from "./middleware/validateResource";
import { categorySchema } from "./schema/categories.schema";
import { colorSchema } from "./schema/color.schema";
import { conversionsSchema } from "./schema/conversions.schema";
import { createUserSchema } from "./schema/influencer.schema";
import { addCategory, getinsight } from "./service/category.service";

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
   /**
   * @openapi
   * '/api/influencer':
   *  post:
   *     tags:
   *     - influencer
   *     summary: Register a new influencer
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateInfluencerInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/influencer", validateResource(createUserSchema), createUserHandler);
   /**
   * @openapi
   * '/api/products':
   *  post:
   *     tags:
   *     - conversion
   *     summary: Register a new conversion
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateConversionInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateConversionResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/products",validateResource(conversionsSchema),createProductHandler);
     /**
   * @openapi
   * '/api/getproducts':
   *  post:
   *     tags:
   *     - conversion
   *     summary: get informations about conversion
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              type: object
   *              properties:
   *                start:
   *                  type: string
   *                  default: 2021-12-02
   *                finish:
   *                  type: string
   *                  default: 2022-12-04
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                totalSales:
   *                  type: number
   *                Sales:
   *                  type: number
   *                AverageCart:
   *                  type: number
   *                CountryNumber:
   *                  type: number
   *                ProductSoldNumber:
   *                  type: number
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/getproducts",GlobalPerformanceConversion);
  app.post("/api/color",validateResource(colorSchema),createColorHandler);
  app.post("/api/category",validateResource(categorySchema),createCategoryHandler);
     /**
   * @openapi
   * '/api/getcategory':
   *  post:
   *     tags:
   *     - Insight
   *     summary: get Insight informations
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              type: object
   *              properties:
   *                start:
   *                  type: string
   *                  default: 2021-12-02
   *                finish:
   *                  type: string
   *                  default: 2022-12-04
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                totalSales:
   *                  type: object
   *                popularCategory:
   *                  type: object
   *                popularMoment:
   *                  type: object
   *                popularcolor:
   *                  type: object
   *                popularcountry:
   *                  type: object
   *                popularinfluencer:
   *                  type: object
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/getcategory",GlobalInsight);
}


export default routes;