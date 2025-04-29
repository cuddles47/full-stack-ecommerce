import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

import { validateEnv } from "../config/env.config";

import BadRequestError from "../errors/bad-request.error";
import ForbiddenError from "../errors/forbidden.error";
import NotFoundError from "../errors/not-found.error";

import { UserRepository } from "../repositories/user.repository";

import { signJwt } from "../utils/jwt";
import { addTokenToBlockList } from "../utils/token-cache";
import UnauthenticatedError from "../errors/unauthenticated.error";
import HttpException from "../errors/http-exception.error";
import { dot } from 'dot-object';

export class AuthService {
    private readonly userRepository: UserRepository;
    private readonly accessSecret: string;
    private readonly accessExpiration: string;
    private readonly refreshAccessSecret: string;
    private readonly refreshAccessExpiration: string;

    constructor() {
        this.userRepository = new UserRepository();
        const envConfig = validateEnv()?.jwtconfig || {};
        this.accessSecret = envConfig.accessSecret;
        this.accessExpiration = envConfig.accessExpiration;
        this.refreshAccessSecret = envConfig.refreshAccessSecret;
        this.refreshAccessExpiration = envConfig.refreshAccessExpiration;
    }

    private generateTokens(userId: string | Types.ObjectId) {
        const accessToken = signJwt({ userId }, this.accessSecret, {
            expiresIn: this.accessExpiration,
        });

        const refreshToken = signJwt({ userId }, this.refreshAccessSecret, {
            expiresIn: this.refreshAccessExpiration,
        });

        return { accessToken, refreshToken };
    }

    refreshToken = async (refreshToken: string) => {
        try {
            jwt.verify(refreshToken, this.refreshAccessSecret);

            const user = await this.userRepository.findUserByRefreshToken(
                refreshToken
            );

            if (!user) {
                throw new ForbiddenError("Refresh token has been revoked");
            }

            const { accessToken, refreshToken: newRefreshToken } =
                this.generateTokens(user._id);

            await this.userRepository.updateUserRefreshToken(
                user._id.toString(),
                newRefreshToken
            );

            return { accessToken, newRefreshToken };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new UnauthenticatedError(
                "Something went wrong when verifying token"
            );
        }
    };

    login = async (username: string, password: string) => {
        const user = await this.userRepository.findExtendedUserByUsername(
            username,
            true,
            true
        );

        if (!user) {
            throw new ForbiddenError("Tài khoản hoặc mật khẩu không chính xác");
        }

        if (!user.status) {
            throw new ForbiddenError("Người dùng chưa được kích hoạt");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new ForbiddenError("Tài khoản hoặc mật khẩu không chính xác");
        }

        const { accessToken, refreshToken } = this.generateTokens(user._id);
        await this.userRepository.updateUserRefreshToken(
            user._id.toString(),
            refreshToken
        );

        return {
            userData: {
                _id: user._id,
                username: user.username,
                detail_user: user.detail_user,
                grant_all: user.roles.some((role) => role.grant_all),
                permissions: Array.from(
                    new Set(
                        user.roles.flatMap((role) =>
                            role.permissions.map((perm) => perm.name)
                        )
                    )
                ),
            },
            accessToken,
            refreshToken,
        };
    };

    logout = async (
        userId: string,
        accessToken: string,
        refreshToken: string
    ) => {
        try {
            const payload = jwt.verify(
                refreshToken,
                this.refreshAccessSecret
            ) as any;

            if (payload.userId !== userId) {
                throw new ForbiddenError("Bạn không có quyền thực hiện hành động này");
            }

            await this.userRepository.updateUserRefreshToken(userId, null);
            await addTokenToBlockList(
                accessToken as string,
                validateEnv()?.jwtconfig?.accessExpiration as string
            );
        } catch (error) {
            throw new UnauthenticatedError(
                "Có lỗi xảy ra khi xác thực token"
            );
        }
    };

    changePassword = async (
        userId: any,
        oldPassword: string,
        newPassword: string
    ) => {
        const user = await this.userRepository.findUserWithPasswordById(userId);

        if (!user) {
            throw new NotFoundError("Người dùng không tồn tại");
        }

        const match = await bcrypt.compare(oldPassword, user.password);

        if (!match) {
            throw new BadRequestError("Mật khẩu cũ không chính xác");
        }

        // Generate a new hashed password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        await this.userRepository.updateById(userId, {
            password: hashPassword,
            updated_by: userId,
        });

        return true;
    };

    checkPassword = async (userId: any, password: string) => {
        const user = await this.userRepository.findUserWithPasswordById(userId);

        if (!user) {
            throw new NotFoundError("Người dùng không tồn tại");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new BadRequestError("Mật khẩu không chính xác");
        }
    };

    changeAvatar = async (userId: any, avatar: string) => {
        await this.userRepository.updateById(userId, {
            "detail_user.avatar": avatar,
            updated_by: userId,
        });
    };

    updateProfile = async (userId: string, updateData: any) => {
        try {
            const updatedUser = await this.userRepository.update(
                { _id: userId },
                {
                    $set: {
                        ...dot(updateData),
                        updated_by: userId
                    }
                }
            );

            if (!updatedUser) {
                throw new NotFoundError("Không tìm thấy người dùng");
            }

            return updatedUser;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new BadRequestError("Có lỗi xảy ra khi cập nhật thông tin");
        }
    };
}
