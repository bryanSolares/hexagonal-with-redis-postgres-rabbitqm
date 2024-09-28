import { Request, Response } from "express";
import { OrderRepository } from "../../infrastructure/repositories/OrderRepository";
import { publishEvent } from "../../infrastructure/events/RabbitPublisher";

export class OrderController {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(req: Request, res: Response) {
    const { clientId, products } = req.body;
    const newOrder = {
      clientId,
      products,
      status: "pending",
    };

    await this.orderRepository.createOrder(newOrder);
    await publishEvent(newOrder);

    res.status(201).json({ message: "Order created successfully" });
  }

  async getOrdersByClientId(req: Request, res: Response) {
    const { clientId } = req.params;
    const orders = await this.orderRepository.getOrdersByClientId(clientId);

    res.status(200).json({ orders });
  }
}
