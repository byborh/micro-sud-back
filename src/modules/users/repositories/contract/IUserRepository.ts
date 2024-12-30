import { CredentialData } from "@modules/users/domain/CredentialData";
import { User } from "../../domain/User";

export interface IUserRepository {
    findUserByField(field: string, value: string): Promise<User | null>
    getAllUsers(): Promise<Array<User> | null>
    createUser(user: User, credentialData: CredentialData): Promise<User | null>
    modifyUser(user: User, credentialData?: CredentialData): Promise<User | null>
    deleteUser(user: User): Promise<boolean>
}