import { IRoleRepository } from "../repositories/contract/IRoleRepository";
import { RoleAbstract } from "@modules/roles/entity/Role.abstract";

export class RoleService {
    private roleRepository: IRoleRepository;

    constructor(roleRepository: IRoleRepository) {
        this.roleRepository = roleRepository;
    }

    // Get a role by ID
    public async getRoleById(roleId: string): Promise<RoleAbstract | null> {
        try {
            // Verify if roleId is provided
            if (!roleId) {
                throw new Error("RoleAbstract ID is required.");
            }

            // Call RoleRepository to find a role by ID
            const roleEntity: RoleAbstract = await this.roleRepository.getRoleById(roleId);

            // If no role is found, return null
            if (!roleEntity) {
                throw new Error("RoleAbstract not found.");
            }

            // Return the role
            return roleEntity;
        } catch (error) {
            console.error("Error finding role in RoleService:", error);
            throw new Error("Failed to find role.");
        }
    }

    // Get all roles
    public async getRoles(): Promise<Array<RoleAbstract> | null> {
        try {
            // Call RoleRepository to find all roles
            const rolesEntity: RoleAbstract[] = await this.roleRepository.getRoles();

            // If no roles are found, return null
            if (!rolesEntity) return null;

            // Return all roles
            return rolesEntity.map(roleEntity => roleEntity);
        } catch (error) {
            console.error("Error finding roles in RoleService:", error);
            throw new Error("Failed to find roles.");
        }
    }

    // Create role
    public async createRole(role: RoleAbstract): Promise<RoleAbstract | null> {
        try {
            // Check if the role already exists based on name and resource
            const existingRole: RoleAbstract | null = await this.roleRepository.getRoleByName(role.getName());
            if (existingRole) {
                console.error("RoleAbstract already exists:", existingRole);
                throw new Error("RoleAbstract already exists.");
            }

            // Create role through repository
            const createdRole: RoleAbstract | null = await this.roleRepository.createRole(role);

            // If role creation fails, throw an error
            if (!createdRole) {
                throw new Error("RoleAbstract didn't create...");
            }

            // Return the created role
            return createdRole;
        } catch (error) {
            console.error("Error creating role in RoleService:", error);
            throw new Error("Failed to create role.");
        }
    }

    // Modify role
    public async modifyRole(roleId: string, data: Partial<RoleAbstract>): Promise<RoleAbstract | null> {
        try {
            // Verify if role exists
            const existingRole: RoleAbstract | null = await this.getRoleById(roleId);
            if (!existingRole) {
                throw new Error("RoleAbstract not found.");
            }

            let hasChanges: boolean = false;

            // Update data in entity
            if (data.name && data.name !== existingRole.getName()) {
                existingRole.setName(data.name);
                hasChanges = true;
            }

            if (data.description && data.description !== existingRole.getDescription()) {
                existingRole.setDescription(data.description);
                hasChanges = true;
            }

            // If no changes detected, throw an error
            if (!hasChanges) {
                throw new Error("No changes detected.");
            }

            // Update role in the database
            const updatedRole: RoleAbstract | null = await this.roleRepository.modifyRole(existingRole);

            if (!updatedRole) return null;

            // Return the updated role
            return updatedRole;
        } catch (error) {
            console.error("Error modifying role in RoleService:", error);
            throw new Error("Failed to modify role.");
        }
    }

    // Delete role
    public async deleteRole(roleId: string): Promise<boolean> {
        try {
            // Verify if roleId is provided
            if (!roleId) {
                throw new Error("RoleAbstract ID is required.");
            }

            // Find the role by ID
            const role: RoleAbstract | null = await this.getRoleById(roleId);
            if (!role) {
                console.error("RoleAbstract not found:", roleId);
                return false;
            }

            // Delete the role
            const isDeleted: boolean = await this.roleRepository.deleteRole(roleId);

            // Return true if the role is deleted, false otherwise
            return isDeleted;
        } catch (error) {
            console.error("Error deleting role in RoleService:", error);
            throw new Error("Failed to delete role.");
        }
    }
}
