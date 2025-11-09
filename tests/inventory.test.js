describe('Inventory Management', () => {
    let inventoryId;

    beforeAll(async () => {
        // Setup code to initialize the database or create a test inventory item
    });

    afterAll(async () => {
        // Cleanup code to remove test data from the database
    });

    test('Add Inventory Item', async () => {
        const newItem = {
            itemId: 'item001',
            quantity: 100,
            restockLevel: 20
        };
        const response = await request(app)
            .post('/api/inventory')
            .send(newItem);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Inventory item added successfully');
        inventoryId = response.body.data.id; // Assuming the response contains the new item's ID
    });

    test('Update Inventory Item', async () => {
        const updatedItem = {
            quantity: 150
        };
        const response = await request(app)
            .put(`/api/inventory/${inventoryId}`)
            .send(updatedItem);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Inventory item updated successfully');
    });

    test('Check Stock Level', async () => {
        const response = await request(app)
            .get(`/api/inventory/${inventoryId}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('quantity', 150);
    });

    test('Delete Inventory Item', async () => {
        const response = await request(app)
            .delete(`/api/inventory/${inventoryId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Inventory item deleted successfully');
    });
});