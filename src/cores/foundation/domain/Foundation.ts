import { TFoundation } from "../contracts/TFoundation";

export class Foundation<T extends TFoundation> {
    constructor(public data: T) {}
}