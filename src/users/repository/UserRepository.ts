import { User } from "../domain/User";

export class UserRepository {

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

    public async getAllUsers(): Promise<Array<User>> {
        return this.users;
    }

    public async createUser(user: User): Promise<User | null> {
        this.users.push(user);
        return this.findById(user.getId());
    }
}