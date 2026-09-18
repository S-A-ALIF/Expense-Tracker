import jwt from 'jsonwebtoken';
import { CookieOptions } from 'express';
import { envConfig } from './env.config';

export interface AccessTokenPayload {
    id: string;
    email: string;
}

export interface RefreshTokenPayload {
    id: string;
}

export const generateAccessToken = (payload: AccessTokenPayload): string => {
    return jwt.sign(payload, envConfig.jwt.accessSecret, {
        expiresIn: envConfig.jwt.accessExpiresIn as jwt.SignOptions['expiresIn'],
    });
};

export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
    return jwt.sign(payload, envConfig.jwt.refreshSecret, {
        expiresIn: envConfig.jwt.refreshExpiresIn as jwt.SignOptions['expiresIn'],
    });
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
    return jwt.verify(token, envConfig.jwt.accessSecret) as AccessTokenPayload;
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
    return jwt.verify(token, envConfig.jwt.refreshSecret) as RefreshTokenPayload;
};

export const refreshTokenCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: envConfig.nodeEnv === 'production',
    sameSite: envConfig.nodeEnv === 'production' ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
};
