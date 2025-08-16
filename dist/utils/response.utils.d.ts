import { Response } from 'express';
interface SuccessResponse<T = any> {
    success: true;
    data: T;
    message?: string;
    pagination?: {
        page: number;
        pages: number;
        total: number;
        limit: number;
    };
}
export interface ErrorResponse {
    success: false;
    message: string;
    errors?: any;
}
export declare const successResponse: <T>(res: Response, data: T, message?: string, statusCode?: number, pagination?: any) => Response<SuccessResponse<T>>;
export declare const errorResponse: (res: Response, message: string, statusCode?: number, errors?: any) => Response<ErrorResponse>;
export {};
//# sourceMappingURL=response.utils.d.ts.map