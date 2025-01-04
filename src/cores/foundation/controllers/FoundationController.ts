import { FoundationService } from "../services/FoundationService";
import { Request, Response } from "express";

export class FoundationController {
    // Service
    private foundationService: FoundationService;

    // Constructor
    constructor(foundationService: FoundationService) {this.foundationService = foundationService;}

    // Get a user by ID
    // public async getResourceById(req: Request, res: Response): Promise<void> {
    //     try {
    //         // Verify permissions ...


    //         // Get the user from the service
    //         const userDto = await this.foundationService.getResourceById(req.params.id);

    //         // If the user is not found, return an error
    //         if(!userDto) {
    //             res.status(404).json({error: "User not found"});
    //             return;
    //         }

    //         // Return the user
    //         res.status(200).json(userDto);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({error: "Internal server error"});
    //     }
    // }

    // // Get all users
    // public async getAllUsers(req: Request, res: Response): Promise<void> {
    //     // Verify permissions ...

    //     try {
    //         // Get all users from the service
    //         const users: Array<UserDTO> = await this.userService.getUsers();

    //         if(!users) {
    //             res.status(404).json({error: "Users not found"});
    //             return;
    //         }

    //         // Return the users
    //         res.status(200).json(users);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({error: "Internal server error"});
    //     }
    // }

    // // Create user
    // public async createUser(req: Request, res: Response): Promise<void> {
    //     // Verify permissions ...

    //     try {
    //         // Change the type of user
    //         const userDTO: UserDTO = req.body as User;
    //         const userEntity: User = UserMapper.toEntity(userDTO as User);

    //         if (!userEntity.getEmail || !userEntity.getPassword) {
    //             res.status(400).json({ error: "Email and password are required." });
    //             return;
    //         }

    //         // Use the service to create the user
    //         const user: UserDTO = await this.userService.createUser(userEntity);

    //         if(!user) {
    //             res.status(404).json({error: "User didn't created"});
    //             return;
    //         }

    //         res.status(201).json(user);
    //         return;
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({error: "Internal server error", cause: error});
    //     }
    // }

    // // Modify user
    // public async modifyUser(req: Request, res: Response): Promise<void> {
    //     // Verify permissions ...

    //     try {
    //         // Change the type of user
    //         const userDTO: UserDTO = req.body as User;
    //         const userEntity: User = UserMapper.toEntity(userDTO as User);
    //         userEntity.setId(req.params.id);

    //         if (!userEntity.getEmail || !userEntity.getPassword) {
    //             res.status(400).json({ error: "Email and password are required." });
    //             return null;
    //         }

    //         console.log("User to modify in controller:", userEntity);

    //         // Use the service to modify the user
    //         const user: UserDTO = await this.userService.modifyUser(userEntity);

    //         if(!user) {
    //             res.status(404).json({error: "User didn't modified"});
    //             return null;
    //         }

    //         res.status(201).json(user);
    //         return null;
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({error: "Internal server error"});
    //     }
    // }

    // // Delete user
    // public async deleteUser(req: Request, res: Response): Promise<void> {
    //     // Verify permissions ...

    //     try {
    //         const deletedOrNot: boolean = await this.userService.deleteUser(req.params.id);
            
    //         if(!deletedOrNot) {
    //             res.status(404).json({error: "User didn't deleted"});
    //             return;
    //         }

    //         res.status(201).json(deletedOrNot);
    //         return;
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({error: "Internal server error"});
    //     }
    // }
}