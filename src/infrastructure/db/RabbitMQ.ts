import amqp from "amqplib";

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect("amqp://localhost");
  return connection;
};
