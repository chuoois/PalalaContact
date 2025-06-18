import 'dotenv/config';

export const env = {
    PORT: process.env.PORT,
    HOSTNAME: process.env.HOSTNAME,
    MONGODB_URL: process.env.MONGODB_URL,
    DB_NAME: process.env.DB_NAME
};