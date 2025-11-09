//Sure, here's the contents for the file /cafe-management-system/cafe-management-system/tests/menu.test.js:

const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/database');

describe('Menu Management', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    it('should create a new menu item', async () => {
        const response = await request(app)
            .post('/api/menu')
            .send({
                name: 'Coffee',
                price: 2.5,
                description: 'Freshly brewed coffee'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should retrieve all menu items', async () => {
        const response = await request(app).get('/api/menu');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should update a menu item', async () => {
        const response = await request(app)
            .put('/api/menu/1')
            .send({
                name: 'Espresso',
                price: 3.0,
                description: 'Strong and bold espresso'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Menu item updated successfully');
    });

    it('should delete a menu item', async () => {
        const response = await request(app).delete('/api/menu/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Menu item deleted successfully');
    });
});