import amqplib from "amqplib";

const RABBITMQ_URL = "amqp://localhost";
const QUEUE_NAME = "pedido_creado";

async function startConsumer() {
  try {
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, {
      durable: true,
    });

    console.log(`Esperando mensajes en la cola: ${QUEUE_NAME}...`);

    channel.consume(
      QUEUE_NAME,
      (msg) => {
        if (msg !== null) {
          const messageContent = msg.content.toString();
          console.log(`Mensaje recibido: ${messageContent}`);

          const pedido = JSON.parse(messageContent);
          procesarPedido(pedido);

          channel.ack(msg);
        }
      },
      {
        noAck: false,
      }
    );
  } catch (err) {
    console.error("Error al conectarse a RabbitMQ:", err);
  }
}

function procesarPedido(pedido: any) {
  console.log(`Procesando pedido para el cliente: ${pedido.clienteId}`);
}

startConsumer();
