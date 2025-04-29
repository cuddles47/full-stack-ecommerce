declare namespace Express {
    interface Request {
        userData?: {
            username: string;
            [key: string]: any;
        };
        functionName?: string;
    }
}