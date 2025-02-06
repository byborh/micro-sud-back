import express, { Request, Response, NextFunction } from "express";
import { AuthTokenController } from "../controllers/AuthTokenController";
import { validateAttributeMiddleware } from "@middlewares/validateAttributeMiddleware";
import { authMiddleware } from "@middlewares/authMiddleware";

export const AuthTokenRoutes = (authTokenController: AuthTokenController): express.Router => {
    const router = express.Router();

    router.post(
        "/login",
        validateAttributeMiddleware("body", "email", "Email missing or invalid in request body."),
        validateAttributeMiddleware("body", "password", "Password missing or invalid in request body."),
        (req: Request, res: Response, next: NextFunction) => authTokenController.createAuthToken(req, res, next)
    );
    
    // Obtenir le token par userId
    router.get(
        "/tokens/user/:userId",
        authMiddleware(["ADMIN", "MANAGER"]),
        validateAttributeMiddleware("params", "userId", "userId missing or invalid in request params."),
        (req: Request, res: Response, next: NextFunction) => authTokenController.getAuthTokenByUserId(req, res, next)
    );
    
    // Supprimer le token par userId
    router.delete(
        "/tokens/user/:userId",
        authMiddleware(["ADMIN", "MANAGER"]),
        validateAttributeMiddleware("params", "userId", "userId missing or invalid in request params."),
        (req: Request, res: Response, next: NextFunction) => authTokenController.deleteAuthTokenByUserId(req, res, next)
    );
    
    // Récupérer tous les tokens
    router.get(
        "/tokens",
        authMiddleware(["ADMIN"]),
        (req: Request, res: Response, next: NextFunction) => authTokenController.getAllAuthTokens(req, res, next)
    );
    
    // Supprimer un token par son ID
    router.delete(
        "/tokens/:authTokenId",
        authMiddleware(["ADMIN"]),
        validateAttributeMiddleware("params", "authTokenId", "authTokenId missing or invalid in request params."),
        (req: Request, res: Response, next: NextFunction) => authTokenController.deleteAuthTokenById(req, res, next)
    );
    
    return router;
};
