import { Request, Response, NextFunction } from "express";
import { ContentBlockService } from "../services/ContentBlockService";
import { IdGenerator } from "@core/idGenerator";
import { ContentBlockAbstract } from "../entity/ContentBlock.abstract";

export class ContentBlockController {
    constructor(private readonly ContentBlockService: ContentBlockService) {}

    // Get a ContentBlock by ID
    public async getContentBlockById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const ContentBlockDto = await this.ContentBlockService.getContentBlockById(req.params.id);
            if (!ContentBlockDto) {
                res.status(404).json({ error: "ContentBlock not found" });
                return;
            }
            res.status(200).json(ContentBlockDto);
        } catch (error) {
            next(error);
        }
    }

    // Get all ContentBlocks
    public async getAllContentBlocks(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const ContentBlocks = await this.ContentBlockService.getContentBlocks();
            if (!ContentBlocks || ContentBlocks.length === 0) {
                res.status(404).json({ error: "No ContentBlocks found" });
                return;
            }
            res.status(200).json(ContentBlocks);
        } catch (error) {
            next(error);
        }
    }

    // Create a ContentBlock
    public async createContentBlock(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { type, title, content, img, date } = req.body;

            if (!type) {
                res.status(400).json({ error: "Type and password are required." });
                return;
            }

            const idGenerator = IdGenerator.getInstance();
            const ContentBlockId: string = idGenerator.generateId();

            const ContentBlock: ContentBlockAbstract = ({
                id: ContentBlockId,
                type: type,
                title: title,
                content: content,
                img: img,
                date: date,
            }) as ContentBlockAbstract;
            
            const createdContentBlock = await this.ContentBlockService.createContentBlock(ContentBlock);

            if (!createdContentBlock) {
                res.status(400).json({ error: "ContentBlock could not be created." });
                return;
            }

            res.status(201).json(createdContentBlock);
        } catch (error) {
            next(error);
        }
    }

    // Modify a ContentBlock
    public async modifyContentBlock(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { type, title, content, img, date } = req.body;

            // Verify if id is provided
            if (!req.params.id) {
                res.status(400).json({ error: "ContentBlock id is required." });
                return;
            }
    
            const updatedContentBlock = await this.ContentBlockService.modifyContentBlock(req.params.id, {
                type, title, content, img, date
            });
    
            if (!updatedContentBlock) {
                res.status(404).json({ error: "ContentBlock could not be modified." });
                return;
            }
    
            res.status(200).json(updatedContentBlock);
        } catch (error) {
            next(error);
        }
    }
    
    // Delete a ContentBlock
    public async deleteContentBlock(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const isDeleted = await this.ContentBlockService.deleteContentBlock(req.params.id);
            if (!isDeleted) {
                res.status(404).json({ error: "ContentBlock could not be deleted." });
                return;
            }
            res.status(200).json({ message: "ContentBlock deleted successfully." });
        } catch (error) {
            next(error);
        }
    }
}
