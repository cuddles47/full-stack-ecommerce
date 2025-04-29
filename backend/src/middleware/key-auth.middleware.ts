import { Request, Response, NextFunction } from "express";
import UnauthenticatedError from "../errors/unauthenticated.error";
import { KeyRepository } from "../repositories/key.repository";
import { extractKeyFromHeader } from "../utils/util";
import { validate as validateUUID } from "uuid";
import { KeyStatus } from "../enums/key.enum";
import { WorkstationStatus } from "../enums/workstation.enum";

class KeyAuthMiddleware {
    private readonly keyRepository: KeyRepository;

    constructor() {
        this.keyRepository = new KeyRepository();
    }

    public handle = (create: boolean) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                // Extract and validate the API key
                const key = extractKeyFromHeader(req);
                if (!key) {
                    // return next(new UnauthenticatedError("Key is required");
                    throw new UnauthenticatedError("Key là bắt buộc");
                }

                if (!validateUUID(key)) {
                    throw new UnauthenticatedError("Key không hợp lệ");
                }

                // Check if the key exists
                const keyExists = await this.keyRepository.findKeyByKeyValue(
                    key
                );
                if (!keyExists) {
                    throw new UnauthenticatedError("Key không tồn tại");
                }

                // Validate key status based on `create` flag
                if (create && keyExists.status === KeyStatus.USED) {
                    throw new UnauthenticatedError(
                        "Key đã được sử dụng trên một workstation khác"
                    );
                }

                if (!create) {
                    if (keyExists.status === KeyStatus.UNUSED) {
                        throw new UnauthenticatedError(
                            "Key chưa được sử dụng, vui lòng kích hoạt key trước"
                        );
                    }

                    // Validate workstation IP and status
                    if (
                        !keyExists.assigned_workstation ||
                        keyExists.assigned_workstation.status !==
                            WorkstationStatus.ACTIVE
                    ) {
                        throw new UnauthenticatedError(
                            "Workstation không hợp lệ hoặc không hoạt động"
                        );
                    }

                    // !!! Giải pháp không phù hợp !!!

                    // const clientIP = req.ip || req.headers["x-forwarded-for"] || "unknown";
                    // const workstationIP = keyExists.assigned_workstation.workstation_link;

                    // if (clientIP !== workstationIP) {
                    //     throw new UnauthenticatedError("The provided key is not for this workstation");
                    // }

                    if (keyExists.end_at && keyExists.end_at < new Date()) {
                        throw new UnauthenticatedError(
                            "Key đã hết hạn"
                        );
                    }
                }

                // Attach key data to the request object
                req.keyData = {
                    _id: keyExists._id.toString(),
                    key_value: keyExists.key_value,
                    status: keyExists.status,
                    exp: keyExists.exp,
                    end_at: keyExists.end_at,
                };

                next();
            } catch (error) {
                next(error);
            }
        };
    };
}

export default new KeyAuthMiddleware().handle;
