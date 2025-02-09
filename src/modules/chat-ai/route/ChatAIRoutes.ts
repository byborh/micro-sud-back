import express, { Request, Response, NextFunction } from "express";
import { ChatAIController } from "../controllers/ChatAIController";
import { validateAttributeMiddleware } from "@middlewares/validateAttributeMiddleware";
import { authMiddleware } from "@middlewares/authMiddleware";

export const ChatAIRoutes = (chatAIController: ChatAIController): express.Router => {
    const router = express.Router();

    // Connexion
    router.post(
        "/login",
        validateAttributeMiddleware("body", "email", "Email missing or invalid in request body."),
        validateAttributeMiddleware("body", "password", "Password missing or invalid in request body."),
        (req: Request, res: Response, next: NextFunction) => chatAIController.submitPrompt(req, res, next)
    );
    return router;
};
