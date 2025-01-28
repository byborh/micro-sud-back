"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const User_1 = require("../domain/User");
class UserMapper {
    // Transforme un  DTO en une entité User
    static toEntity(dto) {
        return new User_1.User(dto.id, dto.email, dto.password || '', // Le mot de passe n'est pas stocké en clair, on utilise une valeur par défault
        dto.firstname, dto.lastname, dto.pseudo, dto.telnumber);
    }
    static toDTO(user) {
        return {
            id: user.getId(),
            email: user.getEmail(),
            password: user.getPassword(),
            firstname: user.getFirstname(),
            lastname: user.getLastname(),
            pseudo: user.getPseudo(),
            telnumber: user.getTelnumber()
        };
    }
}
exports.UserMapper = UserMapper;
