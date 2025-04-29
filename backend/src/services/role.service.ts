import { z } from "zod";

import BadRequestError from "../errors/bad-request.error";
import ConflictError from "../errors/conflict.error";
import NotFoundError from "../errors/not-found.error";

import { RoleRepository } from "../repositories/role.repository";
import { PermissionRepository } from "../repositories/permission.repository";

import { buildSearchFilter, buildSortQuery } from "../utils/util";

import {
    ChangeRoleStatusSchema,
    CreateRoleSchema,
    FindRoleQuerySchema,
    UpdateRoleSchema,
} from "../validation/role.validation";

export class RoleService {
    private readonly roleRepository: RoleRepository;
    private readonly permissionRepository: PermissionRepository;

    constructor() {
        this.roleRepository = new RoleRepository();
        this.permissionRepository = new PermissionRepository();
    }

    createRole = async (
        userId: any,
        data: z.infer<typeof CreateRoleSchema>
    ) => {
        const { name, grant_all, description } = data;

        const existingRole = await this.roleRepository.findRoleByName(name);

        if (existingRole) {
            throw new ConflictError(`Vai trò "${name}" đã tồn tại trong hệ thống`);
        }

        return await this.roleRepository.create({
            ...data,
            created_by: userId,
        });
    };

    listAllRoles = async (query: z.infer<typeof FindRoleQuerySchema>) => {
        const { search, sort, page, limit, status } = query;

        // Include 'name' in the fuzzyFields array to search on role names
        const filter = buildSearchFilter(search, ['name'], { status });

        const sortOptions = buildSortQuery(sort);
        const total = await this.roleRepository.count(filter);

        const roles = await this.roleRepository.findAll(
            filter,
            sortOptions,
            page,
            limit
        );

        return { total, roles };
    };

    getRoleById = async (id: string) => {
        return await this.roleRepository.findById(id);
    };

    updateRole = async (
        userId: any,
        id: string,
        data: z.infer<typeof UpdateRoleSchema>
    ) => {
        if (data.permissions) {
            const permissions = await this.permissionRepository.findByIds(
                data.permissions
            );
            if (permissions.length !== data.permissions.length) {
                throw new BadRequestError("Một số quyền không tồn tại");
            }
        }

        const updatedRole = await this.roleRepository.updateById(id, {
            ...data,
            updated_by: userId,
        });

        if (!updatedRole) {
            throw new NotFoundError("Vai trò không tồn tại");
        }

        return updatedRole;
    };

    changeRoleStatus = async (userId: any, id: string, status: boolean) => {
        const updatedRole = await this.roleRepository.updateById(id, {
            status: status,
            updated_by: userId,
        });

        if (!updatedRole) {
            throw new NotFoundError("Vai trò không tồn tại");
        }

        return updatedRole;
    };
}
