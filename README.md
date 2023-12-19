# MERN Stack Project

## Description
This is a full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. The system provides CRUD (Create, Read, Update, Delete) operations for products and includes user authentication.

## Features
- Product Management:
  - Create, Read, Update, and Delete products
  - View a list of all products
- User Authentication:
  - Sign up with a new account
  - Log in with existing credentials
  - Secure authentication using JSON Web Tokens (JWT)
  - Logout functionality
  - Password hashing for user security

## Technologies Used
- MongoDB: Database for storing product and user information
- Express.js: Backend framework for handling server-side logic
- React: Frontend library for building user interfaces
- Node.js: Server-side runtime environment
- Mongoose: MongoDB object modeling for Node.js
- JWT: JSON Web Tokens for secure user authentication
- Axios: HTTP client for making API requests

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ballpanuwat25/mern-stack.git
   ```
2. Navigate to the project directory:
	``` bash
	cd mern-stack
	```
3. Navigate to the project directory:
	```bash
	cd frontend
	npm install
	cd ../backend
	npm install
	```
## Configuration
Configure a `.env` file in the `backend` directory following variables:
```
PORT=8080
JWT_SECRET=your_jwt_secret_key
MONGO_URL=your_mongodb_connection_string
```

## Usage
1. Start the server:
	```bash
	cd backend
	npm start
	```
2. Start the client:
	```bash
	cd frontend
	npm start
	```
3. Open your browser and navigate to `http://localhost:3000` to use the application.

## API Endpoints
-   **Product API:**

    -   GET `http://localhost:8080/products`: Get all products
    -   GET `http://localhost:8080/products/:id`: Get a specific product
    -   POST `http://localhost:8080/products`: Create a new product
    -   PATCH `http://localhost:8080/products/:id`: Update a product
    -   DELETE `http://localhost:8080/products/:id`: Delete a product
-   **Authentication API:**
    
    -   POST `http://localhost:8080/auth/register`: User sign up
    -   POST `http://localhost:8080/auth/login`: User login
    -   POST `http://localhost:8080/auth/logout`: User logout

## License

This project is licensed under the MIT License.
