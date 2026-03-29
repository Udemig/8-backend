import type { Request, Response, NextFunction } from "express";
declare const register: (req: Request, res: Response, next: NextFunction) => void;
declare const login: (req: Request, res: Response, next: NextFunction) => void;
declare const logout: (req: Request, res: Response, next: NextFunction) => void;
declare const profile: (req: Request, res: Response, next: NextFunction) => void;
export { register, login, logout, profile };
//# sourceMappingURL=auth.controller.d.ts.map