import dotenv from "dotenv";

dotenv.config();

// Configurate the database with the fils .env
export const dbConfig = {
    mysql: {
        host: process.env.MYSQL_HOST || "localhost",
        port: Number(process.env.MYSQL_PORT) || 3306,
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "myapp",
    },
    redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || "",
    },
    mongodb: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/myapp",
    },
};
