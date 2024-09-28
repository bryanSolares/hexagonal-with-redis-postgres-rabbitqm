docker run --name postgres -dp 5432:5432 -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=restaurant postgres:17.0-alpine
docker run --name redis -p 6379:6379 -d redis
docker run --name rabbitmq -p 5672:5672 -p 15672:15672 -d rabbitmq:management
