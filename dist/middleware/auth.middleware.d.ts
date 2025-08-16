import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
export declare const authenticate: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<import("../utils/response.utils").ErrorResponse, Record<string, any>> | undefined>;
export declare const optionalAuth: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.middleware.d.ts.map