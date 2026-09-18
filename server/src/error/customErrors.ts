export class CustomError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string = 'Bad Request') {
        super(message, 400);
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string = 'Unauthorized access') {
        super(message, 401);
    }
}

export class ForbiddenError extends CustomError {
    constructor(message: string = 'Forbidden: Access denied') {
        super(message, 403);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
    }
}

export class ConflictError extends CustomError {
    constructor(message: string = 'Conflict: Resource already exists') {
        super(message, 409);
    }
}

export class InternalServerError extends CustomError {
    constructor(message: string = 'Internal server error') {
        super(message, 500);
    }
}
