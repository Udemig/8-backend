export declare class BaseError extends Error {
    statusCode: number;
    errorCode: string;
    isOperational: boolean;
    constructor(message: string, statusCode: number, errorCode: string);
}
export declare class BadRequest extends BaseError {
    constructor(message?: string);
}
export declare class Unauthorized extends BaseError {
    constructor(message?: string);
}
export declare class Forbidden extends BaseError {
    constructor(message?: string);
}
export declare class NotFound extends BaseError {
    constructor(message?: string);
}
//# sourceMappingURL=errors.d.ts.map