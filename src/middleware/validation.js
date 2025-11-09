module.exports = (req, res, next) => {
    const { body } = req;

    // Example validation for user registration
    if (req.path === '/register') {
        const { username, password } = body;
        if (!username || typeof username !== 'string' || username.length < 3) {
            return res.status(400).json({ error: 'Invalid username' });
        }
        if (!password || typeof password !== 'string' || password.length < 6) {
            return res.status(400).json({ error: 'Invalid password' });
        }
    }

    // Example validation for menu item creation
    if (req.path === '/menu') {
        const { name, price } = body;
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'Invalid menu item name' });
        }
        if (price === undefined || typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ error: 'Invalid menu item price' });
        }
    }

    // Add more validations as needed for other routes

    next();
};