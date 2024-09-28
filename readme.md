# Sistema de Gestión de Pedidos con Redis y RabbitMQ

Este proyecto es una aplicación backend desarrollada en TypeScript con Node.js, utilizando una arquitectura hexagonal y principios SOLID. Se compone de dos servicios principales: uno para gestionar pedidos y otro para recibir y procesar eventos de pedidos mediante RabbitMQ.

## Características

- **Node.js + TypeScript**: Backend desarrollado con Express y TypeScript.
- **Arquitectura Hexagonal**: Separación clara entre capas para facilitar el mantenimiento y la evolución del código.
- **Redis**: Almacenamiento intermedio para manejar caché.
- **PostgreSQL**: Base de datos relacional principal.
- **RabbitMQ**: Sistema de mensajería para la comunicación asíncrona.
- **SOLID**: Aplicación de principios SOLID para mantener un código modular y fácil de extender.

## Requisitos

- Node.js
- PostgreSQL
- Redis
- RabbitMQ
- Docker (opcional, para iniciar los servicios de base de datos y mensajería)
