import { Request, Response, NextFunction } from "express";
import { TTypeName } from "@modules/content-blocks/contracts/TTypeName";

const requiredFieldsMap: Record<TTypeName, string[]> = {
  machine: ["type", "title", "img"],
  blog: ["type", "title", "content"], // Img is optional and Date will come later
  section: ["type", "title", "content", "img"],
  historique: ["type", "content"],
  engagements: ["type", "content"],
  savoir_faire: ["type", "content"],
};

/**
 * Middleware to validate the presence of required fields in the request body 
 * based on the content block type. It checks if the 'type' is provided and valid, 
 * retrieves the required fields for that type, and ensures those fields are 
 * present in the request body. If any checks fail, a 400 Bad Request response 
 * with an appropriate error message is sent. Otherwise, the request proceeds 
 * to the next middleware or controller.
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */

export const validateContentBlockByTypeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { type } = req.body;

  if (!type || typeof type !== "string") {
    res.status(400).json({ error: "Missing or invalid 'type' in request body." });
    return;
  }

  const requiredFields = requiredFieldsMap[type as TTypeName];

  if (!requiredFields) {
    res.status(400).json({ error: `Unknown ContentBlock type: '${type}'.` });
    return;
  }

  const missingFields = requiredFields.filter((field) => !(field in req.body));

  if (missingFields.length > 0) {
    res.status(400).json({
      error: `Missing required fields for type '${type}': ${missingFields.join(", ")}.`,
    });
    return;
  }

  next();
};