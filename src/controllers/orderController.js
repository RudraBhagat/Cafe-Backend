const { query } = require('../utils/database');

// Helper function to validate order items
const validateItems = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
        return { isValid: false, message: 'Items array is required and cannot be empty' };
    }

    for (const item of items) {
        if (!item.id || !Number.isInteger(item.id) || item.id <= 0) {
            return { isValid: false, message: 'Each item must have a valid id (positive integer)' };
        }
        if (!item.quantity || !Number.isInteger(item.quantity) || item.quantity <= 0) {
            return { isValid: false, message: 'Each item must have a valid quantity (positive integer)' };
        }
    }

    return { isValid: true };
};

// Get all orders
exports.getOrders = async (req, res) => {
    try {
        console.log('Fetching all orders...');
        const orders = await query('SELECT * FROM orders');
        console.log(`Found ${orders.length} orders`);
        res.status(200).json({
            message: 'Orders retrieved successfully',
            count: orders.length,
            orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ 
            message: 'Failed to fetch orders',
            error: error.message 
        });
    }
};

// Add new order
exports.addOrder = async (req, res) => {
    console.log('Received order creation request. content-type:', req.headers && req.headers['content-type']);
    console.log('Raw body type:', typeof req.body);

    // If client sent body as raw text (text/plain) try to parse JSON defensively
    let body = req.body;
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
            console.log('Parsed raw body into JSON');
        } catch (err) {
            console.warn('Unable to parse raw body as JSON');
        }
    }

    try {
        const { customer_name, items, total_amount, user_id } = body || {};

        // Validate customer name
        if (!customer_name || typeof customer_name !== 'string' || customer_name.trim().length === 0) {
            return res.status(400).json({ 
                message: 'Customer name is required and must be a non-empty string' 
            });
        }

        // Validate items
        const itemsValidation = validateItems(items);
        if (!itemsValidation.isValid) {
            return res.status(400).json({ message: itemsValidation.message });
        }

        // Validate total amount
        if (!total_amount || typeof total_amount !== 'number' || total_amount <= 0) {
            return res.status(400).json({ 
                message: 'Total amount is required and must be a positive number' 
            });
        }

        // Create order in database
        const result = await query(
            'INSERT INTO orders (user_id, customer_name, items, total_amount, status) VALUES (?, ?, ?, ?, ?)',
            [user_id || null, customer_name, JSON.stringify(items), total_amount, 'Pending']
        );

        console.log('Order created successfully:', result);

        res.status(201).json({
            message: 'Order created successfully',
            order: {
                order_id: result.insertId,
                user_id: user_id || null,
                customer_name,
                items,
                total_amount,
                status: 'Pending',
                order_date: new Date()
            }
        });
    } catch (error) {
        console.error('Failed to create order:', error);
        res.status(500).json({
            message: 'Failed to create order',
            error: error.message
        });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    console.log('Received status update request:', req.params, req.body);

    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate ID
        const orderId = Number(id);
        if (!Number.isInteger(orderId) || orderId <= 0) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }

        // Validate status
        const validStatuses = ['Pending', 'Completed', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
            });
        }

        // Check if order exists
        const existingOrder = await query('SELECT * FROM orders WHERE order_id = ?', [orderId]);
        if (!existingOrder || existingOrder.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update status
        const result = await query(
            'UPDATE orders SET status = ? WHERE order_id = ?',
            [status, orderId]
        );

        console.log('Status update result:', result);

        res.status(200).json({
            message: 'Order status updated successfully',
            order: {
                order_id: orderId,
                status,
                previousStatus: existingOrder[0].status
            }
        });
    } catch (error) {
        console.error('Failed to update order status:', error);
        res.status(500).json({
            message: 'Failed to update order status',
            error: error.message
        });
    }
};

// Delete order
exports.deleteOrder = async (req, res) => {
    console.log('Received delete request:', req.params);

    try {
        const { id } = req.params;

        // Validate ID
        const orderId = Number(id);
        if (!Number.isInteger(orderId) || orderId <= 0) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }

        // Check if order exists
        const existingOrder = await query('SELECT * FROM orders WHERE order_id = ?', [orderId]);
        if (!existingOrder || existingOrder.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Delete order
        const result = await query('DELETE FROM orders WHERE order_id = ?', [orderId]);
        console.log('Delete result:', result);

        res.status(200).json({
            message: 'Order deleted successfully',
            order: {
                order_id: orderId,
                deletedAt: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Failed to delete order:', error);
        res.status(500).json({
            message: 'Failed to delete order',
            error: error.message
        });
    }
};
