import { Request, Response } from "express";
import { UserService } from "../service/UserService";

export class UserController {
    // Service
    private userService: UserService;

    // Constructor
    constructor(userService: UserService) {this.userService = userService;}

    // Get a user by ID
    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            // Get the user from the service
            const userDto = await this.userService.getUserById(req.params.id);

            // If the user is not found, return an error
            if(!userDto) {
                res.status(404).json({error: "User not found"});
                return;
            }

            // Return the user
            res.status(200).json(userDto);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }

    // Get all users
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        // Verify permissions ...

        try {
            // Get all users from the service
            const users = await this.userService.getUsers();

            if(!users) {
                res.status(404).json({error: "Users not found"});
                return;
            }

            // Return the users
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }

    // Create user
    public async createUser(req: Request, res: Response): Promise<void> {
        // Verify permissions ...

        try {
            const user = await this.userService.createUser(req.body);
            if(!user) {
                res.status(404).json({error: "User not found"});
                return;
            }
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }

    // Modify user
    public async modifyUser(req: Request, res: Response): Promise<void> {
        // Verify permissions ...

        try {
            const user = await this.userService.modifyUser(req.body);
            if(!user) {
                res.status(404).json({error: "User not found"});
                return;
            }
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }

    // Delete user
    public async deleteUser(req: Request, res: Response): Promise<void> {
        // Verify permissions ...

        try {
            const user = await this.userService.deleteUser(req.params.id);
            if(!user) {
                res.status(404).json({error: "User not found"});
                return;
            }
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
}