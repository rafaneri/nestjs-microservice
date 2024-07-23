# NestJS Microservices Example

This project demonstrates how to create and use microservices using the NestJS framework. The application has been converted to a monorepo model to facilitate and reuse components.

## Applications

The project consists of the following applications:

1. **API Gateway**: Routes requests to the respective microservices.
2. **Get Balance**: A microservice-based on TCP transport to obtain the account balance.
3. **List Statement**: A microservice-based on TCP transport to obtain the account statement.
4. **Update Balance**: A microservice that uses RabbitMQ as a broker to register and dispatch event updates for an account.
5. **Wallet Updater**: A microservice that uses RabbitMQ as a broker to update the account balance and statements.

## Endpoints

The API Gateway provides three endpoints for clients to interact with:

- **Get Balance**: Fetches the balance of an account.
- **List Statement**: Retrieves the statement of an account.
- **Update Balance**: Register and dispatch transactions update on account.
- **Wallet Updater**: Summarize, update balance, and manage statements for an account.

Each endpoint executes the action of a corresponding microservice.

The swagger json is available on [[aqui](http://localhost:3000/swagger/json)](http://localhost:3000/swagger/json)

## Technologies

- **NodeJS**: The runtime environment.
- **NestJS**: The framework used to build the application.
- **Docker Compose**: Manages the execution of services.
- **RabbitMQ**: Used as a broker for the Update Balance microservice.
- **MongoDB**: Used for persistence.

## Project Architecture

![Arquitetura drawio](https://github.com/user-attachments/assets/40b9f8ae-10f5-46f5-9197-db9117d0b44a)


## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- NodeJS v18
- Docker

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rafaneri/nestjs-microservice.git
   ```

2. Navigate to the project directory:
   ```bash
   cd nestjs-microservices-example
   ```

### Running the Application

To start the application, run the following command:

```bash
docker-compose up -d
```

This will start all the necessary services including the API Gateway, the microservices, RabbitMQ, and MongoDB.

### Accessing the Endpoints

Once the application is running, you can access the endpoints provided by the API Gateway:

- **Get Balance**: http://localhost:3000/wallet/:wallet/balance
- **List Statement**: http://localhost:3000/wallet/:wallet/statement
- **Update Balance**: http://localhost:3000/wallet/:wallet/transact

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

### Improvements

- **Exception handler**
- **Fault tolerance**
- **Observability**
- **Exhaustive tests**

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
