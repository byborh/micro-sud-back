// Import des modules
import { UserDTO } from "../dto/UserDTO"
import { User } from "../domain/User"

export class UserMapper {
    // Transforme un  DTO en une entité User
    static toEntity(dto: UserDTO): User {
        return new User(
            dto.id,
            dto.email,
            '', // Le mot de passe n'est pas stocké en clair, on utilise une valeur par défault
            dto.firstname,
            dto.lastname,
            dto.pseudo,
            dto.telnumber
        )
    }

    static toDTO(user: User): UserDTO {
        return {
            id: user.getId(),
            email: user.getEmail(),
            firstname: user.getFirstname(),
            lastname: user.getLastname(),
            pseudo: user.getPseudo(),
            telnumber: user.getTelnumber()
        }
    }
}