class AppError extends Error {
    constructor(statusCode, message="Something went wrong in ApiError.js") {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        this.success=false;
    }
}

export {AppError}