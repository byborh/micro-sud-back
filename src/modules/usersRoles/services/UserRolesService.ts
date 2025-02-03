import { UserRoles } from "../entity/UserRoles.entity";
import { UserRolesRepositoryMySQL } from "../repositories/drivers/UserRolesRepositoryMySQL";

export class UserRolesService {
    private userRolesRepository: UserRolesRepositoryMySQL;

    constructor(userRolesRepository: UserRolesRepositoryMySQL) {
        this.userRolesRepository = userRolesRepository;
    }

    // Get a userRoles by ID
    public async getUserRolesById(userRolesId: string): Promise<UserRoles | null> {
        try {
            // Verify if userRolesId is provided
            if (!userRolesId) {
                throw new Error("UserRoles ID is required.");
            }

            // Call UserRolesRepository to find a userRoles by ID
            const userRolesEntity: UserRoles = await this.userRolesRepository.getUserRolesById(userRolesId);

            // If no userRoles is found, return null
            if (!userRolesEntity) {
                throw new Error("UserRoles not found.");
            }

            // Return the userRoles
            return userRolesEntity;
        } catch (error) {
            console.error("Error finding userRoles in UserRolesService:", error);
            throw new Error("Failed to find userRoles.");
        }
    }

    // Get all userRoles
    public async getUserRoles(): Promise<Array<UserRoles> | null> {
        try {
            // Call UserRolesRepository to find all userRoles
            const userRolesEntity: UserRoles[] = await this.userRolesRepository.getUserRoles();

            // If no userRoles are found, return null
            if (!userRolesEntity) return null;

            // Return all userRoles
            return userRolesEntity.map(userRolesEntity => userRolesEntity);
        } catch (error) {
            console.error("Error finding userRoles in UserRolesService:", error);
            throw new Error("Failed to find userRoles.");
        }
    }

    // Create userRoles
    public async createUserRoles(userRoles: UserRoles): Promise<UserRoles | null> {
        try {
            // Check if the userRoles already exists based on action and resource
            const existingUserRoles: UserRoles | null = await this.userRolesRepository.getUserRolesByMultipleFields(["action", "resource"], [userRoles.getAction(), userRoles.getResource()]);
            if (existingUserRoles) {
                console.error("UserRoles already exists:", existingUserRoles);
                throw new Error("UserRoles already exists.");
            }

            // Create userRoles through repository
            const createdUserRoles: UserRoles | null = await this.userRolesRepository.createUserRoles(userRoles);

            // If userRoles creation fails, throw an error
            if (!createdUserRoles) {
                throw new Error("UserRoles didn't create...");
            }

            // Return the created userRoles
            return createdUserRoles;
        } catch (error) {
            console.error("Error creating userRoles in UserRolesService:", error);
            throw new Error("Failed to create userRoles.");
        }
    }
}
