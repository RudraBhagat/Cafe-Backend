describe('Order Management', () => {
    let orderId;

    beforeAll(async () => {
        // Setup code to create a test order
        const response = await request(app)
            .post('/api/orders')
            .send({
                userId: 1,
                menuItems: [{ id: 1, quantity: 2 }],
                totalAmount: 20.00
            });
        orderId = response.body.id;
    });

    afterAll(async () => {
        // Cleanup code to delete the test order
        await request(app).delete(`/api/orders/${orderId}`);
    });

    test('should create a new order', async () => {
        const response = await request(app)
            .post('/api/orders')
            .send({
                userId: 1,
                menuItems: [{ id: 2, quantity: 1 }],
                totalAmount: 10.00
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    test('should retrieve an order by ID', async () => {
        const response = await request(app).get(`/api/orders/${orderId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', orderId);
    });

    test('should update an existing order', async () => {
        const response = await request(app)
            .put(`/api/orders/${orderId}`)
            .send({
                menuItems: [{ id: 1, quantity: 3 }],
                totalAmount: 30.00
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('totalAmount', 30.00);
    });

    test('should delete an order', async () => {
        const response = await request(app).delete(`/api/orders/${orderId}`);
        expect(response.status).toBe(204);
    });
});