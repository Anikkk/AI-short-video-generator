/** @type {import ("drizzle-kit").Config} */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:UWDmgdx9VQG7@ep-proud-dream-a5cnxy9z.us-east-2.aws.neon.tech/neondb?sslmode=require',
    }
}

