const { query } = require('../utils/database');

exports.generateBill = async (req, res) => {
  try {
    console.log('🧾 Billing request body:', req.body);
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: 'orderId is required' });
    }

    // ✅ Log before querying
    console.log('🔍 Checking order for orderId:', orderId);

    const orderResults = await query('SELECT * FROM orders WHERE order_id = ?', [orderId]);
    console.log('🗂️ Order results:', orderResults);

    const order = orderResults[0];
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const totalAmount = order.total_amount;
    console.log('💰 Total amount:', totalAmount);

    const result = await query(
      'INSERT INTO bills (order_id, total_amount, payment_status) VALUES (?, ?, ?)',
      [orderId, totalAmount, 'Pending']
    );
    console.log('✅ Insert result:', result);

    res.status(201).json({
      message: 'Bill generated successfully',
      billId: result.insertId,
    });
  } catch (error) {
    console.error('❌ Error generating bill:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.processPayment = async (req, res) => {
  const { billId, paymentMethod } = req.body;

  try {
    // Update the payment status
    const result = await query(
      'UPDATE bills SET payment_method = ?, payment_status = ? WHERE id = ?',
      [paymentMethod, 'Paid', billId]
    );

    // Check if any row was actually updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    // Fetch the updated bill to confirm
    const [updatedBill] = await query('SELECT * FROM bills WHERE id = ?', [billId]);

    res.json({
      message: 'Payment processed successfully',
      billId: updatedBill.id,
      paymentMethod: updatedBill.payment_method,
      status: updatedBill.payment_status
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};
// 📋 3️⃣ Get all bill details
exports.generateBill = async (req, res) => {
  console.log('billing.generateBill content-type:', req.headers && req.headers['content-type']);

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
      console.log('billing.generateBill: parsed raw body');
    } catch (e) {
      console.warn('billing.generateBill: raw body not JSON');
    }
  }

  const orderId = body && (body.orderId || body.order_id);
  if (!orderId) return res.status(400).json({ message: 'orderId is required' });

  try {
    // Fetch order details
    let orders = await query('SELECT * FROM orders WHERE order_id = ?', [orderId]);
    if (!orders || orders.length === 0) {
      orders = await query('SELECT * FROM orders WHERE id = ?', [orderId]);
    }

    const order = Array.isArray(orders) ? orders[0] : orders;
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const totalAmount = order.total_amount ?? order.totalAmount ?? order.total;
    if (totalAmount === undefined) {
      console.warn('billing.generateBill: total amount missing');
      return res.status(500).json({ message: 'Order exists but total amount unavailable' });
    }

    // Insert into bills
    const result = await query(
      'INSERT INTO bills (order_id, total_amount, payment_status) VALUES (?, ?, ?)',
      [orderId, totalAmount, 'Pending']
    );

    const billId = result.insertId;

    // Return neat JSON response
    res.status(201).json({
      message: 'Bill generated successfully',
      billId,
      orderId,
      totalAmount,
      status: 'Pending'
    });
  } catch (error) {
    console.error('Error generating bill:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// 💳 Process a payment for a bill
exports.processPayment = async (req, res) => {
  const { billId, paymentMethod } = req.body;

  try {
    const result = await query(
      'UPDATE bills SET payment_method = ?, payment_status = ? WHERE id = ?',
      [paymentMethod, 'Paid', billId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    // Fetch updated bill
    const [updatedBill] = await query('SELECT * FROM bills WHERE id = ?', [billId]);

    res.json({
      message: 'Payment processed successfully',
      billId: updatedBill.id,
      paymentMethod: updatedBill.payment_method,
      status: updatedBill.payment_status
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// 📋 Get all bill details or specific bill by ID
exports.getBillDetails = async (req, res) => {
  const { id } = req.params;

  try {
    let bills;
    if (id) {
      // Single bill details
      bills = await query('SELECT * FROM bills WHERE id = ?', [id]);
      if (bills.length === 0) {
        return res.status(404).json({ message: 'Bill not found' });
      }
      return res.json({
        message: 'Bill details fetched successfully',
        bill: bills[0]
      });
    } else {
      // All bills
      bills = await query('SELECT * FROM bills');
      res.json({
        message: 'All bills fetched successfully',
        total: bills.length,
        bills
      });
    }
  } catch (error) {
    console.error('Error fetching bill details:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};