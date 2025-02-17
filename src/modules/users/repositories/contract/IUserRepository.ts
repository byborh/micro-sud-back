import { UserContract } from "@modules/users/contracts/IUser";

export interface IUserRepository {
    findUserByField(field: string, value: string): Promise<UserContract | null>;
    findUserById(userId: string): Promise<UserContract | null>;
    findUserByEmail(email: string): Promise<UserContract | null>;
    getAllUsers(): Promise<Array<UserContract> | null>;
    createUser(user: UserContract): Promise<UserContract | null>;
    modifyUser(user: UserContract): Promise<UserContract | null>;
    deleteUser(userId: string): Promise<boolean>;
}