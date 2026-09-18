import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../error/customErrors';
import { envConfig } from '../config/env.config';

export const errorHandler: ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('--- Server Error ---');
    console.error(`Route: [${req.method}] ${req.originalUrl}`);
    console.error(`Message: ${err.message}`);
    if (envConfig.nodeEnv !== 'production' && err.stack) {
        console.error(err.stack);
    }

    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }

    if (err.code === '23505') {
        res.status(409).json({
            success: false,
            message: 'A record with this information already exists.',
        });
        return;
    }

    if (err.code === '23503') {
        res.status(400).json({
            success: false,
            message: 'Referenced related entity does not exist.',
        });
        return;
    }

    if (err.name === 'JsonWebTokenError') {
        res.status(401).json({
            success: false,
            message: 'Invalid authorization token.',
        });
        return;
    }

    if (err.name === 'TokenExpiredError') {
        res.status(401).json({
            success: false,
            message: 'Authorization token has expired.',
        });
        return;
    }

    const statusCode = err.statusCode || 500;
    const message = envConfig.nodeEnv === 'production'
        ? 'An unexpected internal server error occurred.'
        : (err.message || 'Internal server error.');

    res.status(statusCode).json({
        success: false,
        message,
    });
};
