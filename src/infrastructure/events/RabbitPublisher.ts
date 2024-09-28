import { connectRabbitMQ } from "../db/RabbitMQ";

export async function publishEvent(order: any) {
  const connection = await connectRabbitMQ();
  const channel = await connection.createChannel();

  const exchange = "orders";
  const routingKey = "order.created";

  await channel.assertExchange(exchange, "topic", { durable: true });
  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(order)));

  setTimeout(() => {
    connection.close();
  }, 500);
}
