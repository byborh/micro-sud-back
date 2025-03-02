import { ObjectId } from "mongodb";

export interface IMongeEntity {
    _id: ObjectId // mongo id, cz mongo id is not string but ObjectId !
}