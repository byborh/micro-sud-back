import { Column, Entity, ObjectIdColumn, OneToMany } from "typeorm";
import { TRoleName } from "../../contracts/TRoleName";
import { RoleAbstract } from "../Role.abstract";
import { RoleContract } from "@modules/roles/contracts/IRole";
import { UserRolesMongoEntity } from "@modules/user-roles/entity/mongo/UserRoles.entity";
import { IMongeEntity } from "@modules/roles/contracts/IMongoRole";
import { ObjectId } from "mongodb";

@Entity("roles")
export class RoleMongoEntity extends RoleAbstract implements IMongeEntity {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ length: 50, unique: true })
    name: TRoleName;

    @Column({ nullable: true })
    description: string | null;

    @OneToMany(() => UserRolesMongoEntity, userRole => userRole.role, { cascade: true })
    userRoles: UserRolesMongoEntity[];


    constructor(data?: Partial<RoleContract>) {
        super(data?.id ?? "", data?.name ?? "USER", data?.description ?? null);
        
        this._id = data?.id ? new ObjectId(data.id) : new ObjectId();
        this.name = data?.name ?? "USER";
        this.description = data?.description ?? null;
    }
    
    public getId(): string { return this._id.toHexString(); }
    public getName(): string { return this.name; }
    public getDescription(): string { return this.description; }

    public setId(id: string): void { this._id = new ObjectId(id); }
    public setName(name: TRoleName): void { this.name = name; }
    public setDescription(description: string): void { this.description = description; }
}