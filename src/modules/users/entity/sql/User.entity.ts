import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany, OneToOne } from "typeorm";
import { UserRolesEntity } from "@modules/user-roles/entity/sql/UserRoles.entity";
import { AuthTokenSqlEntity } from "@modules/auth-token/entity/sql/AuthToken.entity";
import { ChatAISQLEntity } from "@modules/chat-ai/entity/sql/ChatAI.entity";
import { UserAbstract } from "../User.abstract";
import { UserDTO } from "@modules/users/dto/UserDTO";

@Entity("users")
export class UserSQLEntity extends UserAbstract {
    @PrimaryColumn({ type: "varchar", length: 255 })
    id: string;

    @Column({ nullable: true, name: "first_name" })
    firstname?: string | null;

    @Column({ nullable: true, name: "last_name" })
    lastname?: string | null;

    @Column({ nullable: true })
    pseudo?: string | null;

    @Column({ unique: true })
    @Index()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true, name: "tel_number" })
    telnumber?: string | null;

    @Column()
    salt: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @Column("json", { nullable: true })
    data: JSON | null;

    @OneToMany(() => UserRolesEntity, userRole => userRole.user, { cascade: true })
    userRoles: UserRolesEntity[];

    @OneToOne(() => AuthTokenSqlEntity, authTokenSqlEntity => authTokenSqlEntity.user) 
    AuthTokenSqlEntity: AuthTokenSqlEntity;

    @OneToMany(() => ChatAISQLEntity, chatAISQLEntity => chatAISQLEntity.user, { cascade: true })
    chatAISQLEntity: ChatAISQLEntity[]

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

    constructor(
        id: string,
        email: string,
        password: string,
        salt: string,
        firstname: string,
        lastname: string,
        pseudo: string,
        telnumber: string,
        createdAt: Date,
        updatedAt: Date
      ) {
        super(id, email, password, salt, firstname, lastname, pseudo, telnumber, createdAt, updatedAt);
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.pseudo = pseudo;
        this.telnumber = telnumber;
      }
      
    // Static constructor
    // constructor(params?: UserContract) {
    //     if (params) {
    //         if (!params.id) throw new Error("ID is required");
    //         if (!params.email || !params.email.includes('@')) throw new Error("Invalid email");

    //         // Verify the password ONLY at creation
    //         if (params.password && params.password.length < 8) throw new Error("Password must be at least 8 characters");
            
    //         super(params.id, params.email, params.password, params.salt, params.createdAt, params.updatedAt, params.firstname, params.lastname, params.pseudo, params.telnumber);

    //         this.id = params.id;
    //         this.email = params.email;
    //         this.password = params.password || "";
    //         this.salt = params.salt || "";
    //         this.firstname = params.firstname || null;
    //         this.lastname = params.lastname || null;
    //         this.pseudo = params.pseudo || null;
    //         this.telnumber = params.telnumber || null;
    //         this.createdAt = params.createdAt || null;
    //         this.updatedAt = params.updatedAt || null;
    //     }
    // }

    getId(): string {return this.id;}
    getFirstname(): string | null {return this.firstname;}
    getEmail(): string {return this.email;}
    getPassword(): string {return this.password;}
    getSalt(): string | null {return this.salt;}
    getPseudo(): string | null {return this.pseudo;}
    getLastname(): string | null {return this.lastname;}
    getTelnumber(): string | null {return this.telnumber;}
    getCreatedAt(): Date {return this.createdAt;}
    getUpdatedAt(): Date {return this.updatedAt;}
    
    
    setId(id: string): void {this.id = id;}
    setEmail(email: string): void {this.email = email;}
    setPassword(password: string): void {this.password = password;}
    setSalt(salt: string): void {this.salt = salt;}
    setPseudo(pseudo: string): void {this.pseudo = pseudo;}
    setFirstname(firstname: string): void {this.firstname = firstname;}
    setLastname(lastname: string): void {this.lastname = lastname;}
    setTelnumber(telnumber: string): void {this.telnumber = telnumber;}
    setCreatedAt(date: Date): void {this.createdAt = date;}
    setUpdatedAt(date: Date): void {this.updatedAt = date;}

    toDto(): UserDTO {
        return {
            id: this.id,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            pseudo: this.pseudo,
            telnumber: this.telnumber,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}