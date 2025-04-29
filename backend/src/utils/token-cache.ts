import NodeCache from "node-cache";
import ms from "ms";

const jwtCache = new NodeCache();

export const addTokenToBlockList = async (token: string, tokenExp: string) => {
    // Parse tokenExp properly - if it's in seconds or milliseconds format, use it directly
    // If it's another format that ms accepts (like "1h", "7d"), it will be converted properly
    let expiryInSeconds: number;
    
    try {
        // Ensure the result of ms() is treated as a number before division
        const milliseconds = Number(ms(tokenExp as any));
        expiryInSeconds = milliseconds / 1000;
    } catch (error) {
        // If the string format is not recognized by ms, try to parse it as a number
        const expNum = parseInt(tokenExp, 10);
        if (isNaN(expNum)) {
            // Default to 1 hour if parsing fails
            expiryInSeconds = 3600; 
        } else {
            // Assume the number is in seconds already
            expiryInSeconds = expNum;
        }
    }
    
    // Set token in cache with expiry in seconds
    jwtCache.set(`at-${token}`, token, expiryInSeconds);
};

export const isTokenBlocked = async (token: string) => {
    const tokenKey = await jwtCache.get(`at-${token}`);

    if (tokenKey) {
        return true;
    }
    return false;
};
