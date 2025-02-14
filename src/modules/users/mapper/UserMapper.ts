// Import des modules
import { UserDTO } from "../dto/UserDTO";
import { User } from "../entity/typeorm/User.entity";
import { UserContract } from "../contracts/IUser";
import { Repository } from "typeorm";
import { MySQLDatabase } from "@db/drivers/mysql.datasource";
import { getDatabase } from "@db/DatabaseClient";

export class UserMapper {
    private static repository: Repository<User>;

    // Initialize the repository
    private static async initRepository() {
        if(!this.repository) {
            const myDB = await getDatabase();
            this.repository = (myDB as MySQLDatabase).getDataSoure().getRepository(User);
        }
    }

    // Transform the dto to the entity
    static async toEntity(dto: UserDTO): Promise<User> {
        if (!dto.id) throw new Error("User ID is required.");

        // Be sur that the repository is initialized
        await this.initRepository();
        
        // Get existing user from the database
        const existingUser: User | null = await this.repository.findOne({ where: { id: dto.id } });

        if (!existingUser) throw new Error("User not found.");

        return new User({
            id: dto.id,
            email: dto.email,
            password: existingUser.password, // Let password unchanged
            salt: existingUser.salt, // Let salt unchanged
            firstname: dto.firstname || null,
            lastname: dto.lastname || null,
            pseudo: dto.pseudo || null,
            telnumber: dto.telnumber || null,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt
        } as UserContract);
    }


    // Transform the entity to the dto
    static toDTO(user: User): UserDTO {
        return {
            id: user.getId(),
            email: user.getEmail(),
            firstname: user.getFirstname(),
            lastname: user.getLastname(),
            pseudo: user.getPseudo(),
            telnumber: user.getTelnumber(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt()
        };
    }
}
