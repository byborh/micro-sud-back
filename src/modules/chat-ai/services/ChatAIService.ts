import { UserRepositoryMySQL } from "@modules/users/repositories/drivers/UserRepositoryMySQL";
import { ChatAI } from "../entity/ChatAI.entity";
import { ChatAIRepositoryMySQL } from "../repositories/drivers/ChatAIRepositoryMySQL";
import { PasswordManager } from "@core/cryptography/PasswordManager";
import { UserRolesRepositoryMySQL } from "@modules/user-roles/repositories/drivers/UserRolesRepositoryMySQL";
import { UserRoles } from "@modules/user-roles/entity/UserRoles.entity";
import { CreateToken } from "@core/auth/createToken";

export class ChatAIService {
    private chatAIRepository: ChatAIRepositoryMySQL;
    private userRepository: UserRepositoryMySQL;
    private userRoleRepository: UserRolesRepositoryMySQL;

    constructor(chatAIRepository: ChatAIRepositoryMySQL, userRepository: UserRepositoryMySQL, userRoleRepository: UserRolesRepositoryMySQL) {
        this.chatAIRepository = chatAIRepository;
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
    }

    // Create chatAI
    public async submitPrompt(): Promise<string> {


        return "";
    }
}