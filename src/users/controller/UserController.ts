import { Request, Response } from "express";
import { UserService } from "../service/UserService";

export class UserController {
    // Service
    private userService: UserService;

    // Constructor
    constructor(userService: UserService) {this.userService = userService;}

    // Get a user by ID
    public async getUserById(req: Request, res: Response): Promise<void> {
        // Get the user ID from the request and pass to number type
        const userId = req.params.id;

        // If the user ID is NaN, return an error
        
        // A CHANGER CAR AVANT JE VERIFIE SI L'ID EST NUMERIQUE ALORS QUE MAINTENANT IL EST EN STRING
        if(!userId) {
            res.status(400).json({error: "Invalid user ID."});
            return;
        }

        try {
            // Get the user from the service
            const userDto = await this.userService.getUserById(userId);

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
}