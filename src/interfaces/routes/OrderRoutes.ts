import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { OrderRepository } from "../../infrastructure/repositories/OrderRepository";

const routes = Router();
const controller = new OrderController(new OrderRepository());

routes.post("/", controller.createOrder.bind(controller));
routes.get("/:clientId", controller.getOrdersByClientId.bind(controller));

export default routes;
