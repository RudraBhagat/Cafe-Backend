# ☕ Cafe Management System – Backend API

A complete backend solution for managing a café, built using **Node.js**, **Express**, and **MySQL**.
This system handles **Users, Menu, Orders, Billing, Inventory**, and **Authentication**, providing REST APIs for full CRUD operations.

---

## 🚀 Features

### 👤 **User Authentication**

* Register new users (Admin/Staff)
* Login using JWT authentication
* Secure password handling using bcrypt

### 📋 **Menu Management**

* Add, update, delete menu items
* Fetch full menu or individual items

### 🛒 **Order Management**

* Create new orders
* Fetch all orders
* Update order status
* Validate ordered items

### 💳 **Billing System**

* Generate bill for an order
* Process payment (Credit Card, Cash, UPI, etc.)
* Fetch bill details

### 📦 **Inventory Management**

* Add inventory items
* Update stock
* Reduce stock on order
* Fetch all inventory items

---

## 🛠️ Tech Stack

| Component | Technology               |
| --------- | ------------------------ |
| Backend   | Node.js, Express.js      |
| Database  | MySQL (mysql2 / promise) |
| Auth      | JSON Web Token (JWT)     |
| Security  | bcryptjs                 |
| Tools     | Nodemon, Postman         |

---

## 📁 Project Structure

```
cafe-management-system/
│── src/
│   ├── app.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── menuController.js
│   │   ├── orderController.js
│   │   ├── billingController.js
│   │   └── inventoryController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── menuRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── billingRoutes.js
│   │   └── inventoryRoutes.js
│── node_modules/
│── package.json
│── .env
│── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone repository

```bash
git clone https://github.com/yourusername/cafe-Backend.git
cd cafe-management-system
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup `.env` file

Create your `.env` file:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=cafe_db
JWT_SECRET=your_jwt_secret
PORT=3000
```

### 4️⃣ Start the server

```bash
npm start
```

Server runs at:
👉 `http://localhost:3000`

---

## 📌 API Endpoints

### 🔐 **Authentication**

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

---

### 🍽️ **Menu**

| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| GET    | /api/menu/    | Get all menu items |
| POST   | /api/menu/    | Add new menu item  |
| PUT    | /api/menu/:id | Update menu item   |
| DELETE | /api/menu/:id | Delete menu item   |

---

### 🛒 **Orders**

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| GET    | /api/orders/    | Get all orders   |
| POST   | /api/orders/    | Create new order |
| PUT    | /api/orders/:id | Update order     |

---

### 💳 **Billing**

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| POST   | /api/billing/generate | Generate bill for order |
| POST   | /api/billing/payment  | Process payment         |
| GET    | /api/billing/:id      | Get bill details        |

---

### 📦 **Inventory**

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| GET    | /api/inventory/    | Get all inventory items |
| POST   | /api/inventory/    | Add item to inventory   |
| PUT    | /api/inventory/:id | Update inventory item   |

---

## 🧪 Using Postman

You can test all endpoints easily via **Postman**:

1. Select **Body → raw → JSON**
2. Example request:

```json
{
  "customer_name": "John Doe",
  "items": [
    { "id": 1, "quantity": 2 }
  ],
  "total_amount": 220,
  "user_id": 1
}
```

---

## 📝 License

This project is free to use for personal or educational purposes.

---

## 🤝 Contributing

Pull requests are welcome!
You can improve code structure, add more features, or fix bugs.

---


