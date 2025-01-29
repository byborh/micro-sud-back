import { PermissionService } from "../services/PermissionService";

export class PermissionController {
    private permissionService: PermissionService;

    constructor(permissionService: PermissionService) {
        this.permissionService = permissionService;
    }

    public async getPermissionById(req: Request, res: Response): Promise<void> {
        try {

        } catch (e) {
            console.error("Internal server error. Cannot get permission by id", e);
            throw new Error("Internal server error");
        }
    }

    public async getAllPermissions(req: Request, res: Response): Promise<void> {
        try {

        } catch (e) {
            console.error("Internal server error. Cannot get permissions", e);
            throw new Error("Internal server error");
        }
    }

    public async createPermission(req: Request, res: Response): Promise<void> {
        try {

        } catch (e) {
            console.error("Internal server error. Cannot create permission", e);
            throw new Error("Internal server error");
        }
    }

    public async modifyPermission(req: Request, res: Response): Promise<void> {
        try {

        } catch (e) {
            console.error("Internal server error. Cannot modify permission", e);
            throw new Error("Internal server error");
        }
    }

    public async deletePermission(req: Request, res: Response): Promise<void> {
        try {

        } catch (e) {
            console.error("Internal server error. Cannot delete permission", e);
            throw new Error("Internal server error");
        }
    }
}