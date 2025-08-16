import { Request, Response, NextFunction } from 'express';
interface CustomError extends Error {
    statusCode?: number;
    code?: number;
    keyValue?: any;
}
export declare const errorHandler: (err: CustomError, req: Request, res: Response, next: NextFunction) => Response<import("../utils/response.utils").ErrorResponse, Record<string, any>>;
export {};
//# sourceMappingURL=error.middleware.d.ts.map