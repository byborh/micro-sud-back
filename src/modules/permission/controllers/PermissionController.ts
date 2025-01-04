import { PermissionService } from "../services/PermissionService";

export class PermissionController {
    private permissionService: PermissionService;

    constructor(permissionService: PermissionService) {
        this.permissionService = permissionService;
    }

    public async getPermissionById(req: Request, res: Response): Promise<void> {
        try {

        } catch (error) {
            console.error("Internal server error. Cannot get permission by id", error);
            throw new Error("Internal server error");
        }
    }

    public async getAllPermissions(req: Request, res: Response): Promise<void> {
        try {

        } catch (error) {
            console.error("Internal server error. Cannot get permissions", error);
            throw new Error("Internal server error");
        }
    }

    public async createPermission(req: Request, res: Response): Promise<void> {
        try {

        } catch (error) {
            console.error("Internal server error. Cannot create permission", error);
            throw new Error("Internal server error");
        }
    }

    public async modifyPermission(req: Request, res: Response): Promise<void> {
        try {

        } catch (error) {
            console.error("Internal server error. Cannot modify permission", error);
            throw new Error("Internal server error");
        }
    }

    public async deletePermission(req: Request, res: Response): Promise<void> {
        try {

        } catch (error) {
            console.error("Internal server error. Cannot delete permission", error);
            throw new Error("Internal server error");
        }
    }
}