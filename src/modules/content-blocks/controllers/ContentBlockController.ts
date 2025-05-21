import { Request, Response, NextFunction } from "express";
import { ContentBlockService } from "../services/ContentBlockService";
import { IdGenerator } from "@core/idGenerator";
import { ContentBlockAbstract } from "../entity/ContentBlock.abstract";
import { TTypeName } from "../contracts/TTypeName";
import { S3Service } from "@core/store/S3Service";

export class ContentBlockController {
    constructor(private readonly contentBlockService: ContentBlockService, private readonly s3Service: S3Service) {}

    public async getContentBlockById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const contentBlock = await this.contentBlockService.getContentBlockById(req.params.id);
            if (!contentBlock) {
                res.status(404).json({ error: "ContentBlock not found" });
                return;
            }
            res.status(200).json(contentBlock);
        } catch (error) {
            next(error);
        }
    }

    public async getContentBlocksByType(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const contentBlocks = await this.contentBlockService.getContentBlocksByType(req.params.type as TTypeName);
            if (!contentBlocks || contentBlocks.length === 0) {
                res.status(404).json({ error: "No ContentBlocks found" });
                return;
            }
            res.status(200).json(contentBlocks);
        } catch (error) {
            next(error);
        }
    }

    public async getAllContentBlocks(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const contentBlocks = await this.contentBlockService.getContentBlocks();
            if (!contentBlocks || contentBlocks.length === 0) {
                res.status(404).json({ error: "No ContentBlocks found" });
                return;
            }
            console.log("contentBlocks in controller", contentBlocks);
            res.status(200).json(contentBlocks);
        } catch (error) {
            next(error);
        }
    }

    public async createContentBlock(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { type, title, content, date } = req.body;
            let { img } = req.body;

            if (!type) {
                res.status(400).json({ error: "Type is required." });
                return;
            }

            // Si l'image est existante, alors on la crée sur s3, sinon on laisse vide
            if(img !== "") {img = await this.s3Service.uploadImg(img, "TEST-NAME");}            

            const idGenerator = IdGenerator.getInstance();
            const id: string = idGenerator.generateId();

            const contentBlock: ContentBlockAbstract = {
                id,
                type,
                title,
                content,
                img,
                date
            } as ContentBlockAbstract;

            const created = await this.contentBlockService.createContentBlock(contentBlock);

            if (!created) {
                res.status(400).json({ error: "ContentBlock could not be created." });
                return;
            }

            res.status(201).json(created);
        } catch (error) {
            next(error);
        }
    }

    public async modifyContentBlock(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { type, title, content, date } = req.body;
            let { img } = req.body;

            if (!req.params.id) {
                res.status(400).json({ error: "ContentBlock id is required." });
                return;
            }

            // On supprime l'ancienne image sur s3 et on crée la nouvelle
            if(img !== "") {
                await this.s3Service.deleteImg("TEST-NAME");
                img = await this.s3Service.uploadImg(img, "TEST-NAME");
            }

            const updated = await this.contentBlockService.modifyContentBlock(req.params.id, {
                type,
                title,
                content,
                img,
                date,
            });

            if (!updated) {
                res.status(404).json({ error: "ContentBlock could not be modified." });
                return;
            }

            res.status(200).json(updated);
        } catch (error) {
            next(error);
        }
    }

    public async deleteContentBlock(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.s3Service.deleteImg("TEST-NAME");
            const isDeleted = await this.contentBlockService.deleteContentBlock(req.params.id);
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
