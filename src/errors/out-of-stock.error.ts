export default class OutOfStockError extends Error {
    constructor(message) {
        super(message);
    }
}