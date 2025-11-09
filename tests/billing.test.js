describe('Billing Controller', () => {
    let bill;

    beforeEach(() => {
        bill = {
            orderId: 1,
            amount: 100,
            paymentStatus: 'Pending'
        };
    });

    test('should create a bill', async () => {
        const createdBill = await billingController.createBill(bill);
        expect(createdBill).toHaveProperty('id');
        expect(createdBill.amount).toBe(bill.amount);
        expect(createdBill.paymentStatus).toBe(bill.paymentStatus);
    });

    test('should retrieve a bill by orderId', async () => {
        const retrievedBill = await billingController.getBillByOrderId(bill.orderId);
        expect(retrievedBill).toHaveProperty('orderId', bill.orderId);
    });

    test('should update payment status', async () => {
        const updatedBill = await billingController.updatePaymentStatus(bill.orderId, 'Paid');
        expect(updatedBill.paymentStatus).toBe('Paid');
    });

    test('should throw an error for invalid orderId', async () => {
        await expect(billingController.getBillByOrderId(999)).rejects.toThrow('Bill not found');
    });
});