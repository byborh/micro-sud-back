import express, { Request, Response, NextFunction } from "express";
import { AuthTokenController } from "../controllers/AuthTokenController";
import { validateAttributeMiddleware } from "@middlewares/validateAttributeMiddleware";

export const AuthTokenRoutes = (authTokenController: AuthTokenController): express.Router => {
    const router = express.Router();

    // Create AuthToken
    router.post(
        "/login",
        validateAttributeMiddleware("body", "email", "Email missing or invalid in request body."),
        validateAttributeMiddleware("body", "password", "Password missing or invalid in request body."),
        (req: Request, res: Response, next: NextFunction) => authTokenController.createAuthToken(req, res, next)
    );

    // Get token by user id
    router.get(
        "/tokens/user/:userId",
        validateAttributeMiddleware("params", "userId", "userId missing or invalid in request params."),
        (req: Request, res: Response, next: NextFunction) => authTokenController.getAuthTokenByUserId(req, res, next)
    );

    // Delete token by user id
    router.delete(
        "/tokens/user/:userId",
        validateAttributeMiddleware("params", "userId", "userId missing or invalid in request params."),
        (req: Request, res: Response, next: NextFunction) => authTokenController.deleteAuthTokenByUserId(req, res, next)
    );

    // Get all tokens ONLY FOR ADMIN
    router.get(
        "/tokens",
        // ADD MIDDLEWARE
        (req: Request, res: Response, next: NextFunction) => authTokenController.getAllAuthTokens(req, res, next)
    );

    // Delete token by id ONLY FOR ADMIN
    router.delete(
        "/tokens/:authTokenId",
        // ADD MIDDLEWARE
        validateAttributeMiddleware("params", "authTokenId", "authTokenId missing or invalid in request params."),
        (req: Request, res: Response, next: NextFunction) => authTokenController.deleteAuthTokenById(req, res, next)
    );

    return router;
};
