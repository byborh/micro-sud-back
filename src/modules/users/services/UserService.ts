import {User} from "../domain/User";
import {UserRepositoryMySQL} from "../repositories/drivers/UserRepositoryMySQL";
import {UserMapper} from "../mapper/UserMapper";
import {UserDTO} from "../dto/UserDTO";
import {IdGenerator} from "@core/cryptography/idGenerator";
import {DatabaseFactory} from "@db/DatabaseFactory";
import {PasswordManager} from "@core/cryptography/PasswordManager";
import {FoundationService} from "@core/foundation/services/FoundationService";
import {ETable} from "@core/foundation/contracts/ETable";
import {Foundation} from "@core/foundation/domain/Foundation";
import {TFoundation} from "@core/foundation/contracts/TFoundation";

export class UserService {
    private userRepository: UserRepositoryMySQL;
    private foundationService: FoundationService;

    constructor(userRepository: UserRepositoryMySQL) {
        // Creation dynamicly of the database
        const database = DatabaseFactory.createDatabase("mysql", null);

        // Creation of the repository injecting the database
        this.userRepository = new UserRepositoryMySQL(database);
    }

    // Get a user by ID
    public async getUserById(userId: string): Promise<UserDTO | null> {
        // Find the user by ID from the Foundation Service
        const user: Foundation<User> = await this.foundationService.getResourceByField<User>("id", ETable.USERS, userId);

        // If the user is not found, return null
        if(!user) return null;

        const userDTO: UserDTO = UserMapper.toDTO(user.data as User) as User;

        // ONLY FOR TEST / FOR ADMIN
        userDTO.password = user.data.getPassword();
        userDTO.salt = user.data.getSalt();

        console.log("User found in getUserById Service :", userDTO);

        // Return the user in DTO format
        return userDTO;
    }

    // Get a user by Email
    public async getUserByEmail(email: string): Promise<UserDTO | null> {
        // Find the user by email from the Foundation Service
        const user: Foundation<User> = await this.foundationService.getResourceByField<User>("email", ETable.USERS, email);

        // If the user is not found, return null
        if(!user) return null;

        const userDTO: UserDTO = UserMapper.toDTO(user.data as User) as User;

        // ONLY FOR TEST / FOR ADMIN
        userDTO.password = user.data.getPassword();
        userDTO.salt = user.data.getSalt();

        console.log("User found in getUserByEmail Service :", userDTO);

        // Return the user in DTO format
        return userDTO;
    }

    // Get all users
    public async getUsers(): Promise<Array<UserDTO> | null> {
        const users: Foundation<User>[] = await this.foundationService.getAllResources<User>(ETable.USERS);

        // If users don't found, return null
        if(!users) {return null;}

        // Return all users in DTO format
        return users.map(user => UserMapper.toDTO(user.data));
    }
    
    // Create user
    public async createUser(user: User): Promise<UserDTO | null> {

        // Password management
        const passwordManager = PasswordManager.getInstance();

        // Creation of the salt
        const salt: string = passwordManager.generateSalt();

        // Creation of hashed password
        const hashedPassword: string = passwordManager.hashPassword(user.getPassword(), salt);

        console.log('Hash:', hashedPassword);
        console.log('Salt:', salt);

        // Verification
        const isValid: boolean = passwordManager.verifyPassword(user.getPassword(), salt, hashedPassword);
        console.log('Mot de passe valide:', isValid);

        // Assign hashed password to user
        user.setPassword(hashedPassword);
        user.setSalt(salt);


        const cleanedUser: Foundation<User> = new User(
            "", // id will be generated automatically in Foundation Service
            user.getEmail(),
            user.getPassword(),
            user.getSalt(),
            user.getFirstname() || null,
            user.getLastname() || null,
            user.getPseudo() || null,
            user.getTelnumber() || null
        ) as unknown as Foundation<User>;

        console.log(cleanedUser);

        // Create user from repository
        // const createdUser: User | null = await this.userRepository.createUser(cleanedUser);
        const createdUser: Foundation<User> = await this.foundationService.createResource(ETable.USERS, cleanedUser, 16, "email", user.getEmail());

        // User didn't created
        if(!createdUser) return null;

        return UserMapper.toDTO(createdUser.data);
    }

    // Modify user
    public async modifyUser(user: User): Promise<UserDTO | null> {
        console.log("User to modify in service before all functions:", user);


        // Verify if this user exist
        const exUser: UserDTO | null = await this.getUserById(user.getId()) as User;
        if(!exUser) {
            console.error("User not found:", exUser);
            throw new Error("User not found.");
        }

        console.log("exUser:", exUser);

        const existingUser: User = UserMapper.toEntity(exUser);
        existingUser.setPassword(exUser.password);
        existingUser.setSalt(exUser.salt);

        console.log("existingUser:", existingUser);

        const modifiedUser: User = new User(
            user.getId(), // Can't be changed
            user.getEmail(),
            user.getPassword(), // Can be null
            user.getFirstname(), // Can be null
            user.getLastname(), // Can be null
            user.getPseudo(), // Can be null
            user.getTelnumber(), // Can be null
            user.getSalt()
        );


        // Verify if email n password are not "null"
        if(modifiedUser.getEmail === null && modifiedUser.getPassword() === null) {
            console.error("Email or password can't be null:", modifiedUser);
            throw new Error("Email or password can't be null.");
        }


        // Compare n Verify if user was changed somewhere
        let hasChanges: boolean = false;
        if(modifiedUser.getEmail() !== existingUser.getEmail()) hasChanges = true;
        if(modifiedUser.getFirstname() !== existingUser.getFirstname())  hasChanges = true;
        if(modifiedUser.getLastname() !== existingUser.getLastname())  hasChanges = true;
        if(modifiedUser.getPseudo() !== existingUser.getPseudo())  hasChanges = true;
        if(modifiedUser.getTelnumber() !== existingUser.getTelnumber()) hasChanges = true;

        // Verify if password was changed

        // Password management
        const passwordManager = PasswordManager.getInstance();

        console.log("modifiedUser:", modifiedUser)

        // Verification
        const isPasswordValid: boolean = passwordManager.verifyPassword(modifiedUser.getPassword(), existingUser.getSalt(), existingUser.getPassword());
        console.log('Mot de passe valide:', isPasswordValid);

        if(!isPasswordValid) hasChanges = true;
        

        if(hasChanges)  {
            console.error("User is not different. The same user like before:", modifiedUser);
            throw new Error("User is not different. The same user like before.");
        }

        // Creation of the salt
        const salt: string = passwordManager.generateSalt();

        // Creation of hashed password
        const hashedPassword: string = passwordManager.hashPassword(modifiedUser.getPassword(), salt);

        console.log('Hash:', hashedPassword);
        console.log('Salt:', salt);

        modifiedUser.setSalt(salt);
        modifiedUser.setPassword(hashedPassword);


        console.log("User to modify in service after all functions:", modifiedUser);

        // Modify existing user
        const finalUser: User | null = await this.userRepository.modifyUser(modifiedUser);

        // User didn't modified
        if(!finalUser) return null;

        return UserMapper.toDTO(finalUser);
    }

    public async modifyUser1(user: User): Promise<UserDTO | null> {
        try {
            console.log("User to modify in service:", user);
    
            // Vérifiez si les champs critiques ne sont pas null
            if (!user.getEmail() || !user.getPassword()) {
                throw new Error("Email and password cannot be null.");
            }
    
            // Gestion des mots de passe
            const passwordManager = PasswordManager.getInstance();
            const salt = passwordManager.generateSalt();
            const hashedPassword = passwordManager.hashPassword(user.getPassword(), salt);
            user.setSalt(salt);
            user.setPassword(hashedPassword);
    
            console.log("User with updated password and salt:", user);
    
            // Prépare les champs à mettre à jour
            const updatedFields: Partial<User> = {
                email: user.getEmail(),
                firstname: user.getFirstname(),
                lastname: user.getLastname(),
                pseudo: user.getPseudo(),
                telnumber: user.getTelnumber(),
                password: user.getPassword(),
                salt: user.getSalt(),
            };
    
            // Utilise `modifyUser` pour appliquer les changements
            const modifiedUser = await this.foundationService.modifyResource<User>(
                ETable.USERS,
                new Foundation(user), // Crée un objet Foundation<User>
                updatedFields
            );
    
            if (!modifiedUser) return null;
    
            return UserMapper.toDTO(modifiedUser.data);
        } catch (error) {
            console.error("Error modifying user:", error);
            throw error;
        }
    }

    
    // Delete user
    public async deleteUser(userId: string): Promise<boolean> {
        const user: UserDTO | null = await this.getUserById(userId); // Find the user by ID
        if(!user) {return false;} // User not found
        // Delete the user
        return this.userRepository.deleteUser(UserMapper.toEntity(user));
    }
}