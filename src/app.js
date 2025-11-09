require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const billingRoutes = require('./routes/billingRoutes');
// const inventoryRoutes = require('./routes/inventoryRoutes');
const db = require('./config/database'); // ✅ Import promise pool

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/billing', billingRoutes);
// app.use('/api/inventory', inventoryRoutes);

app.get('/', (req, res) => {
  res.send('☕ Welcome to Cafe Management System Backend API!');
});

// ✅ Test MySQL connection
(async () => {
  try {
    await new Promise(res => setTimeout(res, 500));
    const [rows] = await db.query('SELECT 1 AS test');
    console.log('✅ MySQL connection test successful:', rows);
  } catch (err) {
    console.error('⚠️ Database test query failed:', err.message);
  }
})();

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
