import { User } from "../domain/User";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {

    // Une Fausse base de données
    // A MODIFIER
    // Il faut utiliser un service de base de données (MySQL, MongoDB, etc.)
    private users: User[] = [
        // Liste des utilisateurs
        new User(1, "John", "Doe", "johndoe", "XfV8I@example.com", "password1", "123-456-7890")
    ]

    // Find a user by ID
    public async findById(userId: number): Promise<User | null> {
        const user = this.users.find(user => user.getId() === userId)
        return user || null;
    }

    // Find all users
    public async getAllUsers(): Promise<Array<User>> {
        return this.users;
    }

    // Create user
    public async createUser(user: User): Promise<User | null> {
        this.users.push(user);
        return this.findById(user.getId());
    }

    // Modify user
    public async modifyUser(user: User): Promise<User | null> {
        const updatedUsers = this.users.map((_, i) => 
          i === user.getId() ? user : _
        );
        this.users = updatedUsers;
        return user;
    }      

    // Delete user
    public async deleteUser(user: User): Promise<boolean> {
        const index = this.users.indexOf(user);
        if (index !== -1) {
          this.users.splice(index, 1);
          return true;
        }
        return false;
    }  
}