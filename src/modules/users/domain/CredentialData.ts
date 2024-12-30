import { ICredentialData } from "../contracts/ICredentialData";

export class CredentialData implements ICredentialData {
    public id: string;
    public userid: string;
    public salt: string;

    constructor(id: string, userid: string, salt: string) {
        this.id = id;
        this.userid = userid;
        this.salt = salt;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getUserid(): string {
        return this.userid;
    }

    public setUserid(userid: string): void {
        this.userid = userid;
    }

    public getSalt(): string {
        return this.salt;
    }

    public setSalt(salt: string): void {
        this.salt = salt;
    }
}