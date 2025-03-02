import { ObjectId } from "mongodb";


export class MongoConverter {
    static toObjectId(id: string | ObjectId) {
        return typeof id === "string" ? new ObjectId(id) : id;
    }
}