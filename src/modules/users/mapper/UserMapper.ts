// Import des modules
import { UserDTO } from "../dto/UserDTO";
import { User } from "../domain/User";
import { UserContract } from "../contracts/IUser";

export class UserMapper {
    // Transfirm the dto to the entity
    static toEntity(dto: UserDTO): User {
        return new User({
            id: dto.id,
            email: dto.email,
            password: '', // Void
            salt: '', // Void
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
