import type { NextFunction } from "express";
declare const uploadToCloud: (next: NextFunction, file_path: string, folder: string, width?: number, height?: number, type?: "image" | "video" | "raw" | "auto") => Promise<import("cloudinary").UploadApiResponse>;
export default uploadToCloud;
//# sourceMappingURL=upload-to-cloud.d.ts.map