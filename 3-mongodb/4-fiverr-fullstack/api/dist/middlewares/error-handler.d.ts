import { BaseError } from "../utils/errors.js";
import type { Request, Response, NextFunction } from "express";
declare const errorHandler: (err: BaseError, req: Request, res: Response, next: NextFunction) => void;
export default errorHandler;
//# sourceMappingURL=error-handler.d.ts.map