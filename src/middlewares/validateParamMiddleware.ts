/**
 * Middleware to validate the presence of a specific parameter (e.g., an ID) in the request.
 * This middleware is modular and can validate any parameter name provided as an argument.
 *
 * Usage:
 *   - Pass the parameter name to validate (e.g., 'id') when configuring the middleware.
 *   - If the parameter is missing, a 400 Bad Request response is sent with a customizable error message.
 */
import { Request, Response, NextFunction } from 'express';

export const validateParamMiddleware = (paramName: string, errorMessage: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const paramValue = req.params[paramName];

        if (!paramValue) {
            res.status(400).json({ error: errorMessage });
            return;
        }

        next(); // Proceed to the next (middleware or) controller
    };
};


// How to use, Exemple :

/*
import { validateParamMiddleware } from './path/to/validate_id_middleware';

// Exemple : Middleware to validate 'id' in routes
router.get('/user/:id', validateParamMiddleware('id', 'Invalid user ID'), userController.getUserById);
*/