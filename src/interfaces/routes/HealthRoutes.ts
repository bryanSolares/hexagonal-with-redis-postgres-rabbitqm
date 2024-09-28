import { Request, Response, Router } from "express";
import client from "../../infrastructure/db/RedisClient";
import postgres from "../../infrastructure/db/PostgresClient";
import { connectRabbitMQ } from "../../infrastructure/db/RabbitMQ";

const routes = Router();

routes.get("/", async (req: Request, res: Response) => {
  const response = {
    status: "ok",
    cache: false,
    postgres: false,
    broker: false,
  };

  try {
    await client.ping();
    response.cache = true;
  } catch (error) {
    console.log("Redis is not connected");
  }

  try {
    await postgres.query("select 1");
    response.postgres = true;
  } catch (error) {
    console.log("Postgres is not connected");
  }

  try {
    await connectRabbitMQ();
    response.broker = true;
  } catch (error) {
    console.log("RabbitMQ is not connected");
  }

  res.status(200).json({ message: "Server is running", ...response });
});

export default routes;
