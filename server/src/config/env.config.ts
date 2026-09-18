import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });


export interface EnvConfig {
    nodeEnv: 'development' | 'production' | 'test';
    port: number;
    clientUrl: string;
    databaseUrl: string;
    jwt: {
        accessSecret: string;
        refreshSecret: string;
        accessExpiresIn: string;
        refreshExpiresIn: string;
    };
}


const getEnvConfig = (): EnvConfig => {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw new Error('DATABASE_URL is not defined in the environment variables.');
    }

    return {
        nodeEnv: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
        port: parseInt(process.env.PORT || '5000', 10),
        clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
        databaseUrl,
        jwt: {
            accessSecret: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'default_access_secret_key',
            refreshSecret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret_key',
            accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
            refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d',
        },
    };
};

export const envConfig = getEnvConfig();
