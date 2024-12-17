import { User } from "../../domain/User";

export interface IUserRepository {
    findUserById(userId: string): Promise<User | null>
    findUserByEmail(email: string): Promise<User | null>
    getAllUsers(): Promise<Array<User>>
    createUser(user: User): Promise<User | null>
    modifyUser(user: User): Promise<User | null>
    deleteUser(user: User): Promise<boolean>
}