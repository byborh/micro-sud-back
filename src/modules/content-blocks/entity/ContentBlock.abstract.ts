import { ContentBlockContract } from "../contracts/IContentBlock";
import { TTypeName } from "../contracts/TTypeName";

export abstract class ContentBlockAbstract implements ContentBlockContract {
    id: string;
    type: TTypeName;
    title?: string;
    content?: string;
    img?: string;
    date?: Date;
    
    constructor(
        id: string,
        type: TTypeName,
        title?: string,
        content?: string,
        img?: string,
        date?: Date
    )
    {
        this.id = id;
        this.type = type;
        this.title = title;
        this.content = content;
        this.img = img;
        this.date = date;
    }

    getId(): string {return this.id;}
    getType(): TTypeName {return this.type;}
    getTitle(): string | undefined {return this.title;}
    getContent(): string | undefined {return this.content;}
    getImg(): string | undefined {return this.img;}
    getDate(): Date | undefined {return this.date;}

    setId(id: string): void {this.id = id;}
    setType(type: TTypeName): void {this.type = type;}
    setTitle(title: string): void {this.title = title;}
    setContent(content: string): void {this.content = content;}
    setImg(img: string): void {this.img = img;}
    setDate(date: Date): void {this.date = date;}
}