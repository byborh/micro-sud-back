import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { AuthTokenAbstract } from "../AuthToken.abstract";


@Entity("auth_token")
export class AuthTokenRedis extends AuthTokenAbstract {
    id: string;
    user_id: string;
    token: string;
    createdAt: Date;
    expiresAt: Date;

    constructor(id: string, user_id: string, token: string, createdAt: Date, expiresAt: Date) {
        super(id, user_id, token, createdAt, expiresAt);
        this.id = id;
        this.user_id = user_id;
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
    }

    public getId(): string {return this.id;}
    public getUserId(): string {return this.user_id;}
    public getToken(): string {return this.token;}
    public getCreatedAt(): Date {return this.createdAt;}
    public getExpiresAt(): Date {return this.expiresAt;}

    public setId(id: string): void {this.id = id;}
    public setUserId(userId: string): void {this.user_id = userId;}
    public setToken(token: string): void {this.token = token;}
    public setCreatedAt(date: Date): void {this.createdAt = date;}
    public setExpiresAt(date: Date): void {this.expiresAt = date;}

}