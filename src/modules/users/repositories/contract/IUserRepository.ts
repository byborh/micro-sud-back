import { User } from "../../domain/User";

export interface IUserRepository {
    findUserByField(field: string, value: string): Promise<User | null>
    getAllUsers(): Promise<Array<User> | null>
    createUser(user: User): Promise<User | null>
    modifyUser(user: User): Promise<User | null>
    deleteUser(user: User): Promise<boolean>
}