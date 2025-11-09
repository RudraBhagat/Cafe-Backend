function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US');
}

function generateOrderId() {
    return `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

module.exports = {
    formatCurrency,
    formatDate,
    generateOrderId,
};