import dotenv from "dotenv";
dotenv.config({ path: ".env" });
export const config = {
    //enviroment
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV,
    CLIENT_URL: process.env.CLIENT_URL,
    // db
    MONGO_URI: process.env.MONGO_URI,
    // cloudinary
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_SECRET: process.env.CLOUD_SECRET,
    // jwt
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES: Number(process.env.JWT_EXPIRES),
};
export const isDevelopment = config.NODE_ENV === "development";
export const isProduction = config.NODE_ENV === "production";
//# sourceMappingURL=enviroment.js.map