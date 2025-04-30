import bcrypt from "bcryptjs";
import NotFoundError from "../errors/not-found.error";

import { RoleRepository } from "../repositories/role.repository";
import { UserRepository } from "../repositories/user.repository";

import {
    CreateUserSchema,
    FindUserQuerySchema,
    UpdateUserSchema,
} from "../validation/user.validation";
import ConflictError from "../errors/conflict.error";
import { z } from "zod";
import { buildSearchFilter, buildSortQuery, formatDate, formatGender } from '../utils/util';
import { dot } from "dot-object";
import { IUser } from "../interfaces/user.interface";
import { Types } from "mongoose";
import { Parser } from '@json2csv/plainjs';

export class UserService {
    private readonly userRepository: UserRepository;
    private readonly roleRepository: RoleRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.roleRepository = new RoleRepository();
    }

    createUser = async (
        userId: any,
        data: z.infer<typeof CreateUserSchema>
    ) => {
        const existingUser = await this.userRepository.findUserByUsername(
            data.username
        );

        if (existingUser) {
            throw new ConflictError("Username đã tồn tại");
        }
        const roles = await this.roleRepository.findByIds(data.roles);

        if (roles.length !== data.roles.length) {
            throw new NotFoundError(
                data.roles.length === 1
                    ? "Không tìm thấy vai trò"
                    : "Một số vai trò không tìm thấy"
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        return await this.userRepository.create({
            username: data.username,
            password: hashedPassword,
            detail_user: data.detail_user,
            roles: roles.map((role) => role._id),
            created_by: userId,
        });
    };

    getUserById = async (id: string) => {
        const user = await this.userRepository.findExtendedUserById(id);
        if (!user) {
            throw new NotFoundError("Người dùng không tồn tại");
        }
        return user;
    };

    listAllUsers = async (query: z.infer<typeof FindUserQuerySchema>) => {
        const { search, sort, page, limit, roles, status } = query;

        const filter = buildSearchFilter(
            search,
            ["username", "detail_user.user_code", "detail_user.name"],
            { roles, status }
        );

        const sortOptions = buildSortQuery(sort);

        const total = await this.userRepository.count(filter);

        const users = await this.userRepository.findAll(
            filter,
            sortOptions,
            page,
            limit
        );

        return { total, users };
    };

    updateUser = async (
        userId: any,
        id: string,
        data: z.infer<typeof UpdateUserSchema>
    ) => {
        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
        }

        if (data.roles) {
            const roles = await this.roleRepository.findByIds(data.roles);
            if (roles.length !== data.roles.length) {
                throw new NotFoundError(
                    data.roles.length === 1
                        ? "Vai trò không tồn tại"
                        : "Một số vai trò không tồn tại"
                );
            }
        }

        const updatedUser = await this.userRepository.updateById(id, {
            ...dot(data),
            ...(data.roles ? { "$set": { roles: data.roles } } : {}),
            updated_by: userId,
        });

        if (!updatedUser) {
            throw new NotFoundError("Người dùng không tồn tại");
        }

        return updatedUser;
    };

    changeUserStatus = async (userId: any, id: string, status: boolean) => {
        const updatedUser = await this.userRepository.updateById(id, {
            status,
            updated_by: userId,
        });

        if (!updatedUser) {
            throw new NotFoundError("Người dùng không tồn tại");
        }

        return updatedUser;
    };

    changeManyUserStatus = async (
        userId: any,
        ids: string[],
        status: boolean
    ) => {
        return await this.userRepository.updateByIds(ids, {
            status,
            updated_by: userId,
        });
    };

    exportUsers = async() => {
        const users = await this.userRepository.findAll()

        // Biến đổi dữ liệu để làm phẳng các object lồng nhau
        const flattenedUsers = users.map(user => {
            const userData = user.toObject() as any as Omit<IUser, "roles" | "password" | "created_by" | "updated_by"> & {_id: Types.ObjectId, created_by: {_id: Types.ObjectId, username: string}, updated_by: {_id: Types.ObjectId, username: string},  roles: {_id: Types.ObjectId, name: string, grant_all: boolean, permissions: {_id: Types.ObjectId, name: string}}[]};
            
            return {
                id: userData._id,
                username: userData.username,
                user_code: userData.detail_user.user_code,
                status: userData.status ? 'Hoạt động' : 'Không hoạt động',
                name: userData.detail_user.name,
                dob: formatDate(userData.detail_user.dob, false),
                address: userData.detail_user.address || '',
                gender: formatGender(userData.detail_user.gender),
                roles: userData.roles.map(role => role.name).join(', '),
                created_by: userData.created_by ? userData.created_by.username : '',
                updated_by: userData.updated_by ? userData.updated_by.username : '',
                created_at: formatDate(userData.created_at, false),
                updated_at: formatDate(userData.updated_at, false)
            };
        });

        // Định nghĩa các trường cho CSV với nhãn tiếng Việt
        const fields = [
            { label: 'ID', value: 'id' },
            { label: 'Tên tài khoản', value: 'username' },
            { label: 'Mã nhân sự', value: 'user_code' },
            { label: 'Trạng thái', value: 'status' },
            { label: 'Tên', value: 'name' },
            { label: 'Ảnh đại diện', value: 'avatar' },
            { label: 'Ngày sinh', value: 'dob' },
            { label: 'Địa chỉ', value: 'address' },
            { label: 'Giới tính', value: 'gender' },
            { label: 'Vai trò', value: 'roles' },
            { label: 'Người tạo', value: 'created_by' },
            { label: 'Người cập nhật', value: 'updated_by' },
            { label: 'Ngày tạo', value: 'created_at' },
            { label: 'Ngày cập nhật', value: 'updated_at' }
        ];

        const opts = { fields };
        const parser = new Parser(opts);
        const csv = parser.parse(flattenedUsers);

        return csv;
    }
}
