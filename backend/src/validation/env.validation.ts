import { z } from "zod";

// Schema for environment variables
export const EnvSchema = z.object({
    // Server configuration
    PORT: z
        .string({ required_error: "PORT is required" })
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "PORT must be a valid number greater than 0",
        }),

    NODE_ENV: z.enum(["development", "production", "test"], {
        required_error: "NODE_ENV is required",
    }),

    // Database configuration
    MONGO_DB_URI: z.string({ required_error: "MONGO_DB_URI is required" }),

    // JWT configuration
    JWT: z.string({ required_error: "JWT secret is required" }),
    JWT_EXPIRATION: z.string({
        required_error: "JWT_EXPIRATION is required (e.g., '1h', '1d')",
    }).default('1h'),
    JWT_REFRESH: z.string({ required_error: "JWT Refresh token secret is required" }),
    JWT_REFRESH_EXPIRATION: z.string({
        required_error: "JWT_REFRESH_EXPIRATION is required (e.g., '1d')",
    }).default('1d'),
});

export type EnvConfig = z.infer<typeof EnvSchema>;
