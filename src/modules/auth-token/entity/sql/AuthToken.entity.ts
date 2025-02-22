import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UserSQLEntity } from "@modules/users/entity/sql/User.entity";
import { AuthTokenAbstract } from "../AuthToken.abstract";


@Entity("auth_token")
export class AuthTokenSqlEntity extends AuthTokenAbstract {
    @PrimaryColumn({ type: "varchar", length: 255 })
    id: string;

    @Column({ type: "varchar", length: 255 })
    user_id: string;

    @Column({ type: "varchar", length: 512 })
    token: string;

    @Column({ type: "timestamp" })
    createdAt: Date;

    @Column({ type: "timestamp" })
    expiresAt: Date;

    @OneToOne(() => UserSQLEntity, user => user.AuthTokenSqlEntity, {onDelete: "CASCADE"})
    @JoinColumn({ name: "user_id" })
    user: UserSQLEntity;

    /*
    ----------------------------------------------------------------------------------
        Add liaisons here with other Entities
        Ex :
            - @OneToMany
                entityName: EntityName
            - @OneToMany
                entityName: EntityName
            - @ManyToMany
                entityName: EntityName
            - @ManyToMany
                entityName: EntityName
    ----------------------------------------------------------------------------------
    */

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