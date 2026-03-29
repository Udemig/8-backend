import type { Request, Response, NextFunction } from "express";
type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const catchAsync: (fn: AsyncController) => (req: Request, res: Response, next: NextFunction) => void;
export default catchAsync;
//# sourceMappingURL=catch-async.d.ts.map