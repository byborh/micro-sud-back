import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { User } from "../domain/User";

export class UserController {
    constructor(private readonly userService: UserService) {}

    // Get a user by ID
    public async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userDto = await this.userService.getUserById(req.params.id);
            if (!userDto) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            res.status(200).json(userDto);
        } catch (error) {
            next(error);
        }
    }

    // Get all users
    public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.userService.getUsers();
            if (!users || users.length === 0) {
                res.status(404).json({ error: "No users found" });
                return;
            }
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    // Create a user
    public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password, firstname, lastname, pseudo, telnumber } = req.body;

            if (!email || !password) {
                res.status(400).json({ error: "Email and password are required." });
                return;
            }

            const user = new User({
                id: req.params.id,
                email,
                password,
                salt: "", // À gérer correctement
                firstname,
                lastname,
                pseudo,
                telnumber,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            
            const createdUser = await this.userService.createUser(user);

            if (!createdUser) {
                res.status(400).json({ error: "User could not be created." });
                return;
            }

            res.status(201).json(createdUser);
        } catch (error) {
            next(error);
        }
    }

    // Modify a user
    public async modifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password, firstname, lastname, pseudo, telnumber } = req.body;
    
            if (!email || !password) {
                res.status(400).json({ error: "Email and password are required." });
                return;
            }
    
            const user = new User({
                id: req.params.id,
                email,
                password,
                salt: "", // À gérer correctement
                firstname,
                lastname,
                pseudo,
                telnumber,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            
    
            console.log("User to modify in controller:", user);
    
            const updatedUser = await this.userService.modifyUser(user);
    
            if (!updatedUser) {
                res.status(404).json({ error: "User could not be modified." });
                return;
            }
    
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
    

    // Delete a user
    public async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const isDeleted = await this.userService.deleteUser(req.params.id);
            if (!isDeleted) {
                res.status(404).json({ error: "User could not be deleted." });
                return;
            }
            res.status(200).json({ message: "User deleted successfully." });
        } catch (error) {
            next(error);
        }
    }
}
