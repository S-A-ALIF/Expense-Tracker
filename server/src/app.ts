import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { envConfig } from './config/env.config';
import { pool } from './db';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { NotFoundError } from './error/customErrors';
import { sendSuccess } from './utils/response.utils';

const app: Application = express();

app.use(
    cors({
        origin: envConfig.clientUrl,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/health', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dbResult = await pool.query('SELECT NOW() as current_time');
        
        sendSuccess(res, 'Expense Tracker API is healthy and operational', {
            status: 'UP',
            environment: envConfig.nodeEnv,
            database: 'Connected',
            dbServerTime: dbResult.rows[0].current_time,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        next(error);
    }
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`));
});

app.use(errorHandler);

const PORT = envConfig.port;

app.listen(PORT, () => {
    console.log(`==========================================`);
    console.log(`🚀 Expense Tracker Server is running!`);
    console.log(`📡 Port: ${PORT}`);
    console.log(`🌍 Environment: ${envConfig.nodeEnv}`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
    console.log(`==========================================`);
});

export default app;
