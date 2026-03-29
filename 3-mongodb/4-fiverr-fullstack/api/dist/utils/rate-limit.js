import rateLimit from "express-rate-limit";
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5000,
});
export const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 1000,
});
//# sourceMappingURL=rate-limit.js.map