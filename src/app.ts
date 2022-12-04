import express, { Request, Response } from "express";
import config from "config";
import connect from "./utils/connect";
import routes from "./routes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerDocs from "./utils/swagger";


const port = config.get<number>('port');

const app = express();
app.use(express.json());

app.listen(port, async () => {
    await connect();
    routes(app);
    swaggerDocs(app,port);
  });