import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { envConfig } from '../config/env.config';
import * as schema from './schema';


export const pool = new Pool({
    connectionString: envConfig.databaseUrl,
    ssl: envConfig.databaseUrl.includes('neon.tech') || envConfig.nodeEnv === 'production'
        ? { rejectUnauthorized: false }
        : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
});

pool.on('connect', () => {
    console.log('PostgreSQL (NeonDB) client connected successfully');
});

pool.on('error', (err) => {
    console.error('Unexpected PostgreSQL pool error:', err);
});

export const db = drizzle(pool, { schema });
