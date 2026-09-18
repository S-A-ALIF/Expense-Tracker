import { Response } from 'express';

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

export const sendSuccess = <T>(res: Response, message: string = 'Success', data?: T): Response => {
    const responseBody: ApiResponse<T> = {
        success: true,
        message,
        ...(data !== undefined && { data }),
    };
    return res.status(200).json(responseBody);
};

export const sendCreated = <T>(res: Response, message: string = 'Resource created successfully', data?: T): Response => {
    const responseBody: ApiResponse<T> = {
        success: true,
        message,
        ...(data !== undefined && { data }),
    };
    return res.status(201).json(responseBody);
};
