import { Request, Response, NextFunction } from "express";
import { ChatAIService } from "../services/ChatAIService";

export class ChatAIController {
    private chatAIService: ChatAIService;

    constructor(chatAIService: ChatAIService) {
        this.chatAIService = chatAIService;
    }

    public async submitPrompt(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                res.status(400).json({ error: "Email and password are required." });
                return;
            }
    
            // Appel au service pour générer le token
            const token = await this.chatAIService.createChatAI();
    
            if (!token) {
                res.status(400).json({ error: "Authentication failed." });
                return;
            }
    
            res.status(201).json({ token });
        } catch (error) {
            next(error);
        }
    }
}
