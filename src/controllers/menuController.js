const { query } = require('../utils/database');
require('dotenv').config();

// ✅ Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const result = await query('SELECT * FROM menu');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error });
  }
};

// ✅ Add a new menu item
exports.addMenuItem = async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    const result = await query('INSERT INTO menu (name, description, price, category) VALUES (?, ?, ?, ?)', [name, description, price, category]);
    // result for INSERT is the result object (contains insertId)
    const id = result && (result.insertId || result.insert_id || result.id);
    res.status(201).json({ message: 'Menu item added successfully', id });
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ message: 'Error adding menu item', error: error.message });
  }
};

// ✅ Update a menu item
exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;
  try {
    await query('UPDATE menu SET name=?, description=?, price=?, category=? WHERE id=?', [name, description, price, category, id]);
    res.status(200).json({ message: 'Menu item updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu item', error });
  }
};

// ✅ Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate id
    const idNum = Number(id);
    if (!Number.isInteger(idNum) || idNum <= 0) {
      return res.status(400).json({ message: 'Invalid menu item id' });
    }

    // First check if the item exists
    console.log('Deleting menu item, id param:', id, 'parsed id:', idNum);
    const rows = await query('SELECT id FROM menu WHERE id = ?', [idNum]);
    console.log('SELECT result for id', idNum, ':', rows);
    const item = Array.isArray(rows) ? rows[0] : rows;
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    const result = await query('DELETE FROM menu WHERE id = ?', [idNum]);
    // Check if any row was actually deleted
    if (!result || result.affectedRows === 0) {
      console.error('Delete operation reported success but no rows affected. ID:', idNum, 'result:', result);
      return res.status(500).json({ message: 'Error deleting menu item' });
    }

    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ message: 'Error deleting menu item', error: error.message });
  }
};

