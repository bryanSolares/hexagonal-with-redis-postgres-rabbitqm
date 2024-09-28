import redis from "../db/RedisClient";
import postgres from "../db/PostgresClient";

export class OrderRepository {
  async getOrdersByClientId(clientId: string) {
    const cacheKey = `client:${clientId}:orders`;
    const cacheData = await redis.get(cacheKey);

    if (cacheData) return JSON.parse(cacheData);

    const { rows } = await postgres.query("select * from orders where client_id = $1", [clientId]);

    await redis.set(cacheKey, JSON.stringify(rows), {
      EX: 3600,
    });

    return rows;
  }

  async createOrder(order: any) {
    await postgres.query("insert into orders (client_id, products, status) values ($1, $2, $3)", [
      order.clientId,
      JSON.stringify(order.products),
      order.status,
    ]);

    const cacheKey = `client:${order.clientId}:orders`;
    await redis.del(cacheKey);
    await redis.set(cacheKey, JSON.stringify(order), {
      EX: 3600,
    });
  }
}
