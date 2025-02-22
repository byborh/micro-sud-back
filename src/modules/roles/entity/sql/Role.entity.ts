import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { UserRolesEntity } from "@modules/user-roles/entity/sql/UserRoles.entity";
import { TRoleName } from "../../contracts/TRoleName";
import { RoleAbstract } from "../Role.abstract";

@Entity("roles")
export class RoleSQLEntity  extends RoleAbstract {
    @PrimaryColumn({ type: "varchar", length: 255 })
    id: string;

    @Column({ length: 50, unique: true })
    name: TRoleName;

    @Column({ type: "text", nullable: true })
    description: string | null;

    @OneToMany(() => UserRolesEntity, userRole => userRole.role, { cascade: true })
    userRoles: UserRolesEntity[];


    constructor(id: string, name: TRoleName, description: string) {
        super(id, name, description);
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public getId(): string { return this.id; }
    public getName(): string { return this.name; }
    public getDescription(): string { return this.description; }

    public setId(id: string): void { this.id = id; }
    public setName(name: TRoleName): void { this.name = name; }
    public setDescription(description: string): void { this.description = description; }
}