export default class NotFoundError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}