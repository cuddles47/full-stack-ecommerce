import { Request, Response } from "express";

import NotFoundError from "../errors/not-found.error";

import { RoleService } from "../services/role.service";

import {
    ChangeRoleStatusSchema,
    CreateRoleSchema,
    FindRoleQuerySchema,
    UpdateRoleSchema,
} from "../validation/role.validation";
import { idSchema } from "../validation/objectid.validation";


export class RoleController {
    private readonly roleService: RoleService;

    constructor() {
        this.roleService = new RoleService();
    }

    createRole = async (req: Request, res: Response) => {
        const validatedData = CreateRoleSchema.parse(req.body);

        const userId = req.userData?.userId;

        const role = await this.roleService.createRole(userId, validatedData);

        res.status(201).json({
            message: "Tạo vai trò thành công",
            success: true,
            data: role,
        });
    };

    listAllRoles = async (req: Request, res: Response) => {
        const validatedQuery = FindRoleQuerySchema.parse(req.query);

        const { total, roles } = await this.roleService.listAllRoles(validatedQuery);

        const { page, limit, status, search } = validatedQuery;

        res.status(200).json({
            page,
            limit,
            status,
            search,
            total,
            pages: limit ? Math.ceil(total / limit) : undefined,
            data: roles,
            success: true,
        });
    };

    getRoleById = async (req: Request, res: Response) => {
        const { id } = idSchema.parse(req.params);

        const role = await this.roleService.getRoleById(id);
        if (!role) {
            throw new NotFoundError("Không tìm thấy vai trò nào với ID này");
        }

        res.status(200).json({
            data: role,
            success: true,
        });
    };

    updateRole = async (req: Request, res: Response) => {
        const validatedData = UpdateRoleSchema.parse(req.body);

        const { id } = idSchema.parse(req.params);

        const userId = req.userData?.userId;

        const updatedRole = await this.roleService.updateRole(
            userId,
            id,
            validatedData
        );

        res.status(200).json({
            message: "Cập nhật vai trò thành công",
            success: true,
            data: updatedRole,
        });
    };

    changeRoleStatus = async (req: Request, res: Response) => {
        ChangeRoleStatusSchema.parse(req.body);

        const { id } = idSchema.parse(req.params);

        const { status } = req.body;

        const userId = req.userData?.userId;

        const updatedRole = await this.roleService.changeRoleStatus(
            userId,
            id,
            status
        );

        res.status(200).json({
            message: `${status ? "Kích hoạt" : "Hủy kích hoạt"
                } vai trò thành công`,
            success: true,
            data: updatedRole,
        });
    };
}
