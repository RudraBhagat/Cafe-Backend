# Cafe Management System

This project is a Cafe Management System built using Node.js and MySQL. It provides functionalities for user authentication, menu management, order management, billing, and inventory management.

## Features

- **User Authentication**: Secure login and registration for users.
- **Menu Management**: Add, update, and delete menu items.
- **Order Management**: Create, update, and retrieve orders.
- **Billing**: Generate bills and process payments.
- **Inventory Management**: Manage stock levels and restock items.

## Technologies Used

- Node.js
- Express.js
- MySQL
- JWT for authentication
- dotenv for environment variable management

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd cafe-management-system
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your database credentials and JWT secret:
   ```
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   ```

5. Start the application:
   ```
   npm start
   ```

## Running Tests

To run the tests, use the following command:
```
npm test
```

## License

This project is licensed under the MIT License.