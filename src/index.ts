import express from "express";
import orderRoutes from "./interfaces/routes/OrderRoutes";
import healthRoutes from "./interfaces/routes/HealthRoutes";
import { connectRedis } from "./infrastructure/db/RedisClient";
import { connectPostgres } from "./infrastructure/db/PostgresClient";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/health", healthRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectRedis();
  console.log("Redis connected");
  await connectPostgres();
  console.log("Postgres connected");
});
