import { TTypeName } from "./TTypeName";

export interface ContentBlockContract {
    id: string;
    type: TTypeName;
    title?: string;
    content?: string;
    img?: string;
    date?: Date;
}